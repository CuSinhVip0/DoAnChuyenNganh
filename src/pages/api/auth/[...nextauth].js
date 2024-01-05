import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import {setCookie} from 'cookies-next';
import mysql from 'mysql2/promise';
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'doanchuyennganh',
});
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                const x = await connection.execute(
                    'select * from user where id_nguoidung = ?',
                    [user.id],
                );
                if (x[0].length == 0) {
                    await connection.execute(
                        'insert into user(id_nguoidung,ten) values(?,?)',
                        [user.id, user.name],
                    );
                }

                return true;
            } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async jwt({token, account, profile}) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.id = profile.id;
            }
            return token;
        },
        async session({session, token, user}) {
            // Send properties to the client, like an access_token and user id from a provider.

            session.accessToken = token.accessToken;
            session.user.id = token.id || token.sub;

            return session;
        },
    },
};
export default NextAuth(authOptions);
