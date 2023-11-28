<<<<<<< HEAD
import Head from "next/head";
import Link from "next/link";

export default function Page({ repo }) {
=======
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {getCookie, hasCookie, deleteCookie} from 'cookies-next';
import Nav from '@/component/nav';

export default function Page(props) {
    const router = useRouter();
    const handleLogout = () => {
        // Xóa cookie 'id_nguoidung'
        deleteCookie('id_nguoidung');
        router.reload();
    };

>>>>>>> 0e58d1ae63ea0d1247746cbbb02ad23eecb23fcb
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
<<<<<<< HEAD
            <h1>Home</h1>
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
        </>
    );
}
=======
            <Nav hascookie={props.hascookie} />
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p>hello</p>
            </div>
        </>
    );
}

//xử lý cookie
export const getServerSideProps = ({req, res}) => {
    const cookie = getCookie('id_nguoidung', {req, res}) || null;
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {cookie, hascookie}};
};
>>>>>>> 0e58d1ae63ea0d1247746cbbb02ad23eecb23fcb
