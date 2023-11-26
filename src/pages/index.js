import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {getCookie, hasCookie, deleteCookie} from 'cookies-next';

export default function Page(props) {
    const router = useRouter();
    const handleLogout = () => {
        // Xóa cookie 'id_nguoidung'
        deleteCookie('id_nguoidung');
        router.reload();
    };
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <>
                {props.hascookie ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'}>Register</Link>
                    </>
                )}
            </>
        </>
    );
}

//xử lý cookie
export const getServerSideProps = ({req, res}) => {
    const cookie = getCookie('id_nguoidung', {req, res}) || null;
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {cookie, hascookie}};
};
