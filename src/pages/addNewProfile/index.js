import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';

import React, {useState} from 'react';
import DaTungKhamForm from '../../component/addNewProfile/DaTungKhamForm';
import ChuaTungKhamForm from '../../component/addNewProfile/ChuaTungKhamForm';
import style from '@/styles/addNewProfile/addNewProfile.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {hasCookie} from 'cookies-next';

export const getServerSideProps = ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
};

function Page(props) {
    const [showDaTungKhamForm, setShowDaTungKhamForm] = useState(false);

    const handleButtonClick = (hasPreviousExams) => {
        setShowDaTungKhamForm(hasPreviousExams);
    };
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
                            <h2>Tạo mới hồ sơ</h2>
                        </div>

                        <div>
                            <button onClick={() => handleButtonClick(true)}>
                                Đã từng khám
                            </button>
                            <button onClick={() => handleButtonClick(false)}>
                                Chưa từng khám
                            </button>
                        </div>

                        {/* Hiển thị form tương ứng với lựa chọn của người dùng */}
                        {showDaTungKhamForm ? (
                            <DaTungKhamForm />
                        ) : (
                            <ChuaTungKhamForm />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
