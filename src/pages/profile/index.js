import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';

import style from '@/styles/profile/profile.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faAddressBook,
    faFileAlt,
    faFileMedical,
} from '@fortawesome/free-solid-svg-icons';

import {getCookie, hasCookie} from 'cookies-next';
import React, {useEffect, useState} from 'react';
import PatientInfoForm from '../../component/profile/PatientInfoForm';
import ProfileDialog from '@/component/profile/ProfileDialog';

export const getServerSideProps = async ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});

    const response = await fetch(
        `http://localhost:3000/api/users/patientData?id=${getCookie(
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
    const [activeTab, setActiveTab] = useState('hoso');
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleEdit = () => {
        window.location.href = '/editprofile';
    };
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientData, setPatientData] = useState(props.patientData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = async (patientId) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/deleteProfile?id=${patientId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.ok) {
                setPatientData((prevData) => ({
                    ...prevData,
                    result: prevData.result.filter(
                        (patient) => patient.id_nguoidung !== patientId,
                    ),
                }));

                setIsDialogOpen(false);
                console.log('Đã xóa hồ sơ');
            } else {
                console.error('Failed to delete patient record');
            }
        } catch (error) {
            console.error('Error deleting patient record:', error);
        }
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
                            <div className={style.create_btn}>
                                <button onClick={handleAddProfileClick}>
                                    <FontAwesomeIcon
                                        icon={faUserPlus}
                                        className={style.icon_add}
                                    />
                                    Thêm hồ sơ
                                </button>
                            </div>
                            <div className={style.tab_btn}>
                                <button
                                    onClick={() => handleTabClick('hoso')}
                                    className={
                                        activeTab === 'hoso'
                                            ? `${style.tab_item} active`
                                            : style.tab_item
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faAddressBook}
                                        className={style.icon_profile}
                                    />
                                    Hồ sơ bệnh nhân
                                </button>
                                <button
                                    onClick={() =>
                                        handleTabClick('phieukhambenh')
                                    }
                                    className={
                                        activeTab === 'phieukhambenh'
                                            ? `${style.tab_item} ${style.active}`
                                            : style.tab_item
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faFileMedical}
                                        className={style.icon_profile}
                                    />
                                    Phiếu khám bệnh
                                </button>
                                <button
                                    onClick={() => handleTabClick('benhan')}
                                    className={
                                        activeTab === 'benhan'
                                            ? `${style.tab_item} active`
                                            : style.tab_item
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faFileAlt}
                                        className={style.icon_profile}
                                    />
                                    Bệnh án
                                </button>
                            </div>
                        </div>

                        {/* right */}
                        <div className={style.right}>
                            <div className={style.right_container}>
                                <div
                                    className={` ${style.title} text_align_center`}
                                >
                                    {activeTab === 'hoso' &&
                                        'Danh sách hồ sơ bệnh nhân'}
                                    {activeTab === 'phieukhambenh' &&
                                        'Danh sách phiếu khám bệnh'}
                                    {activeTab === 'benhan' &&
                                        'Danh sách bệnh án'}
                                </div>

                                <div>
                                    {activeTab === 'hoso' &&
                                    props.patientData &&
                                    props.patientData.result.length > 0
                                        ? props.patientData.result.map(
                                              (patient) => (
                                                  <PatientInfoForm
                                                      key={patient.id_nguoidung}
                                                      data={patient}
                                                      onEdit={handleEdit}
                                                      onDelete={() =>
                                                          handleDelete(
                                                              patient.id_nguoidung,
                                                          )
                                                      }
                                                      onViewDetails={() =>
                                                          handleViewDetails(
                                                              patient.id_nguoidung,
                                                          )
                                                      }
                                                  />
                                              ),
                                          )
                                        : activeTab === 'hoso' && (
                                              <div className={style.nullData}>
                                                  <div
                                                      className={
                                                          style.titleNull
                                                      }
                                                  >
                                                      Bạn chưa có hồ sơ bệnh
                                                      nhân. Vui lòng tạo mới hồ
                                                      sơ để được đặt khám.
                                                  </div>
                                              </div>
                                          )}

                                    {isDialogOpen && (
                                        <ProfileDialog
                                            data={selectedPatient}
                                            onClose={handleDialogClose}
                                        />
                                    )}
                                    {activeTab === 'phieukhambenh' ? (
                                        <div>day la phieu kham</div>
                                    ) : (
                                        activeTab === 'phieukhambenh' && (
                                            <div className={style.nullData}>
                                                <div
                                                    className={style.titleNull}
                                                >
                                                    Bạn chưa có thông tin phiếu
                                                    khám
                                                </div>
                                            </div>
                                        )
                                    )}
                                    {activeTab === 'benhan' ? (
                                        <div>day la danh sach benh an</div>
                                    ) : (
                                        activeTab === 'benhan' && (
                                            <div className={style.nullData}>
                                                <div
                                                    className={style.titleNull}
                                                >
                                                    Bạn chưa có benh an
                                                </div>
                                            </div>
                                        )
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
