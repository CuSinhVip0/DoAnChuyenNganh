import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';

import style from '@/styles/profile/profile.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faAddressBook} from '@fortawesome/free-solid-svg-icons';

import {hasCookie} from 'cookies-next';
import React, {useState} from 'react';
import PatientInfoForm from '../../component/profile/PatientInfoForm';
import ProfileDialog from '@/component/profile/ProfileDialog';

export const getServerSideProps = ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
};

function Page(props) {
    const handleAddProfileClick = () => {
        window.location.href = '/addNewProfile';
    };
    const [patientData, setPatientData] = useState({
        id: 1,
        hoTen: 'Nguyen Van A',
        ngaySinh: '01/01/1990',
        sdt: '0123456789',
        gioiTinh: 'Nam',
        bhyt: '0987654321',
        email: 'abc@gmail.com',
        diaChi: '123 Đường ABC, Quận XYZ, Thành phố HCM',
        danToc: 'Kinh',
    });

    const handleEdit = () => {
        window.location.href = '/editprofile';
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDelete = () => {
        const {id} = patientData;

        setPatientData(null);

        setIsDialogOpen(false);
    };
    const handleViewDetails = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Head>
                <title>Đặt lịch khám bệnh - Thông tin tài khoản</title>
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
                            Thông tin tài khoản
                        </Link>
                    </div>

                    <div className={style.content}>
                        <div className={style.left}>
                            <div className={style.tab_btn}>
                                <button onClick={handleAddProfileClick}>
                                    <FontAwesomeIcon
                                        icon={faUserPlus}
                                        className={style.icon_add}
                                    />
                                    Thêm hồ sơ
                                </button>
                                <p className={style.tab_item}>
                                    <FontAwesomeIcon
                                        icon={faAddressBook}
                                        className={style.icon_profile}
                                    />
                                    Hồ sơ bệnh nhân
                                </p>
                            </div>
                        </div>

                        {/* right */}
                        <div className={style.right}>
                            <div className={style.right_container}>
                                <div
                                    className={` ${style.title} text_align_center`}
                                >
                                    Danh sách hồ sơ bệnh nhân
                                </div>
                                <div>
                                    <PatientInfoForm
                                        data={patientData}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onViewDetails={handleViewDetails}
                                    />
                                    {isDialogOpen && (
                                        <ProfileDialog
                                            data={patientData}
                                            onClose={handleDialogClose}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
