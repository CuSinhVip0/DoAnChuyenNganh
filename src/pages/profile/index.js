import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';

import style from '@/styles/profile/profile.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt} from 'react-icons/fa';

import {getCookie, hasCookie} from 'cookies-next';
import React, {useEffect, useState} from 'react';
import PatientInfoForm from '../../component/profile/PatientInfoForm';
import ProfileDialog from '@/component/profile/ProfileDialog';

export const getServerSideProps = async ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});

    const response = await fetch(
        `http://localhost:3000/api/users/patient/patientData?id=${getCookie(
            'id_nguoidung',
            {req, res},
        )}`,
    );

    return {props: {hascookie, patientData: await response.json()}};
};

function Page(props) {
    const handleAddProfileClick = () => {
        window.location.href = '/addNewProfile';
    };

    const handleEdit = () => {
        window.location.href = '/editprofile';
    };
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientData, setPatientData] = useState(props.patientData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const [selectedPatient, setSelectedPatient] = useState(null);
    const handleDelete = () => {
        const {id} = patientData;

        setPatientData(null);

        setIsDialogOpen(false);
    };
    const handleViewDetails = (patientId) => {
        if (patientData && patientData.result) {
            const selectedPatient = patientData.result.find(
                (patient) => patient.id_nguoidung === patientId,
            );
            if (selectedPatient) {
                setIsDialogOpen(true);
                setSelectedPatient(selectedPatient);
            }
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        setPatientData(props.patientData);
    }, [props.patientData]);
    console.log(props.patientData);
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
                                    Thêm hồ sơ
                                </button>
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
                                    {props.patientData &&
                                        props.patientData.result.map(
                                            (patient) => (
                                                <PatientInfoForm
                                                    key={patient.id_nguoidung}
                                                    data={patient}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    onViewDetails={() =>
                                                        handleViewDetails(
                                                            patient.id_nguoidung,
                                                        )
                                                    }
                                                />
                                            ),
                                        )}
                                    {isDialogOpen && (
                                        <ProfileDialog
                                            data={selectedPatient}
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
