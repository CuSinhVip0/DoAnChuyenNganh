import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';

import React, {useState} from 'react';

import style from '@/styles/addNewProfile/addNewProfile.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {hasCookie} from 'cookies-next';
import addProfile from '../../component/addNewProfile/addProfile';

export const getServerSideProps = ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
};

function Page(props) {
    return (
        <>
            <Head>
                <title>Đặt lịch khám bệnh - Chọn khoa khám</title>
            </Head>
            <Nav hascookie={props.hascookie} />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.route}>
                        <Link className={style.route_link} href={'/'}>
                            Trang chủ
                        </Link>

                        <MdKeyboardArrowRight className="mlr_4px" />
                        <Link
                            className={`${style.route_link} font_color_1da1f2`}
                            href={''}
                        >
                            Tạo hồ sơ bệnh nhân
                        </Link>
                    </div>

                    <div className={style.content}>
                        <div className={style.title_add}>
                            <h2>TẠO MỚI HỒ SƠ</h2>
                        </div>
                        <div className={style.form_content}>
                            <addProfile />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
