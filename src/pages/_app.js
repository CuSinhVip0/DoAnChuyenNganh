import '../styles/index.css';
import Nav from '@/component/nav';
import Footer from '@/component/footer';
import {SessionProvider} from 'next-auth/react';
import {useEffect} from 'react';
import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {setCookie, getCookie, hasCookie} from 'cookies-next';
import {useSession, signIn, signOut} from 'next-auth/react';
config.autoAddCss = false;
export default function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <>
            <SessionProvider session={session}>
                {Component.name != 'LoginPage' &&
                    Component.name != 'RegisterPage' && (
                        <Nav hascookie={pageProps.hascookie} />
                    )}
                <Component {...pageProps} />

                {Component.name != 'LoginPage' &&
                    Component.name != 'RegisterPage' && <Footer />}
            </SessionProvider>
        </>
    );
}
