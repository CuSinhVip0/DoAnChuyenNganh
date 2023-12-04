import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {getCookie, hasCookie, deleteCookie} from 'cookies-next';
import Nav from '@/component/nav';

export default function Page(props) {
    const router = useRouter();
    const [bmi, setBMI] = useState(null);

    //Lay thong tin BMI tu API
    const fetchBMI = async () => {};
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
                <Link href="/bmi">
                    <p>Xem BMI</p>
                </Link>
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
