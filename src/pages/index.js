import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/component/nav';
import {hasCookie} from 'cookies-next';
import {useState} from 'react';
export async function getServerSideProps({req, res}) {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {
        props: {hascookie},
    };
}

export default function Page(props) {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <div style={{marginTop: '300px'}}>
                <Link href={'/dat-lich/chon-khoa'}> Đặt lịch</Link>
                <br />
                <Link href={'/bmi'}> BMI</Link>
                <br />
            </div>
        </>
    );
}
