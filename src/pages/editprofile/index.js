// import React from 'react';
import EditProfileForm from '../../component/editprofile/EditProfileForm'; // Import the EditProfileForm component

// const EditProfilePage = () => {
//     return (

//     );
// };

// export default EditProfilePage;

import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';

import style from '@/styles/editprofile/index.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {useRef} from 'react';
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';

export const getServerSideProps = ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
};

function Page(props) {
    const router = useRouter();
    const khoa = useRef();
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
                            Cập nhật thông tin
                        </Link>
                    </div>

                    <div className={style.content}>
                        <div className={style.form_content}>
                            <EditProfileForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
