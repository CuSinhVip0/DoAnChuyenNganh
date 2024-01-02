import Head from 'next/head';
import Link from 'next/link';
import {getCookie, hasCookie} from 'cookies-next';
import React, {useEffect, useState} from 'react';

import style from '@/styles/profile/profile.module.css';

import {MdKeyboardArrowRight} from 'react-icons/md';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faAddressBook,
    faFileAlt,
    faFileMedical,
} from '@fortawesome/free-solid-svg-icons';

import PatientInfoForm from '@/component/profile/PatientInfoForm';
import ProfileDialog from '@/component/profile/ProfileDialog';
import PhieuKhamBenh from '@/component/profile/PhieuKhamBenh';
import {useRouter} from 'next/router';

export const getServerSideProps = async ({req, res}) => {
    const hascookie = await fetch(
        `http://localhost:3000/api/users/getDataUser?id=${getCookie(
            'id_nguoidung',
            {req, res},
        )}`,
    );

    const response = await fetch(
        `http://localhost:3000/api/users/patientData?id=${getCookie(
            'id_nguoidung',
            {req, res},
        )}`,
    );
    const response2 = await fetch(
        `http://localhost:3000/api/users/getPhieuKham?id=${getCookie(
            'id_nguoidung',
            {req, res},
        )}`,
    );

    return {
        props: {
            hascookie: await hascookie.json(),
            patientData: await response.json(),
            phieukham: await response2.json(),
        },
    };
};

function Page(props) {
    const router = useRouter();

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientData, setPatientData] = useState(props.patientData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    useEffect(() => {
        if (props.hascookie.result.length == 0) {
            router.push('/');
        }
    }, [props.hascookie.result]);
    const handleTabClick = (tabName) => {
        router.push({pathname: 'profile', query: {tab: tabName}});
    };

    const handleAddProfileClick = () => {
        router.push({pathname: '/addNewProfile'});
    };
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
            } else {
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

    return (
        props.hascookie.result && (
            <>
                <Head>
                    <title>Thông tin tài khoản</title>
                </Head>
                <div className={style.wrapper}>
                    <div
                        className={style.container}
                        style={{minHeight: 'calc(100vh - 150px)'}}
                    >
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
                                    <button
                                        style={{cursor: 'pointer'}}
                                        onClick={handleAddProfileClick}
                                    >
                                        <FontAwesomeIcon
                                            icon={faUserPlus}
                                            className={style.icon_add}
                                        />
                                        Thêm hồ sơ
                                    </button>
                                </div>
                                <div className={style.tab_btn}>
                                    <button
                                        style={{cursor: 'pointer'}}
                                        onClick={() => handleTabClick('hoso')}
                                        className={
                                            router.query.tab === 'hoso'
                                                ? `${style.tab_item}  ${style.active}`
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
                                        style={{cursor: 'pointer'}}
                                        onClick={() =>
                                            handleTabClick('phieukhambenh')
                                        }
                                        className={
                                            router.query.tab === 'phieukhambenh'
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
                                </div>
                            </div>

                            {/* right */}
                            <div className={style.right}>
                                <div className={style.right_container}>
                                    <div
                                        className={` ${style.title} text_align_center`}
                                    >
                                        {router.query.tab === 'hoso' &&
                                            'Danh sách hồ sơ bệnh nhân'}
                                        {router.query.tab === 'phieukhambenh' &&
                                            'Danh sách phiếu khám bệnh'}
                                    </div>

                                    <>
                                        {router.query.tab === 'hoso' &&
                                        patientData &&
                                        patientData.result.length > 0
                                            ? patientData.result.map(
                                                  (patient) => (
                                                      <PatientInfoForm
                                                          key={
                                                              patient.id_nguoidung
                                                          }
                                                          data={patient}
                                                          onEdit={() => {
                                                              router.push({
                                                                  pathname:
                                                                      '/editprofile',
                                                                  query: {
                                                                      id: patient.id_nguoidung,
                                                                  },
                                                              });
                                                          }}
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
                                            : router.query.tab === 'hoso' && (
                                                  <div
                                                      className={style.nullData}
                                                  >
                                                      <div
                                                          className={
                                                              style.titleNull
                                                          }
                                                      >
                                                          Bạn chưa có hồ sơ bệnh
                                                          nhân. Vui lòng tạo mới
                                                          hồ sơ để được đặt
                                                          khám.
                                                      </div>
                                                  </div>
                                              )}

                                        {isDialogOpen && (
                                            <ProfileDialog
                                                data={selectedPatient}
                                                onClose={handleDialogClose}
                                            />
                                        )}
                                        {router.query.tab === 'phieukhambenh' &&
                                        props.phieukham.result.length > 0
                                            ? props.phieukham.result.map(
                                                  (item, index) => {
                                                      return (
                                                          <PhieuKhamBenh
                                                              key={index}
                                                              data={item}
                                                          />
                                                      );
                                                  },
                                              )
                                            : router.query.tab ===
                                                  'phieukhambenh' && (
                                                  <div
                                                      className={style.nullData}
                                                  >
                                                      <div
                                                          className={
                                                              style.titleNull
                                                          }
                                                      >
                                                          Bạn chưa có thông tin
                                                          phiếu khám
                                                      </div>
                                                  </div>
                                              )}
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default Page;
