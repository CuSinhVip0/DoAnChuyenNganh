import Head from 'next/head';
import Link from 'next/link';
import {getCookie} from 'cookies-next';
import {useRouter} from 'next/router';

import {useRef, useEffect, useState} from 'react';

import style from '@/styles/chon-ho-so.module.css';
import layout from '@/styles/layout/layout.module.css';

import {MdKeyboardArrowRight, MdNavigateNext} from 'react-icons/md';
import {CiUser, CiPhone, CiTrash, CiEdit} from 'react-icons/ci';
import {AiOutlineRollback} from 'react-icons/ai';
import {LiaBirthdayCakeSolid} from 'react-icons/lia';

import {format_date} from '@/functions/xoa_dau';
export const getServerSideProps = async ({req, res}) => {
    const hascookie = await fetch(
        `http://localhost:3000/api/users/getDataUser?id=${getCookie(
            'id_nguoidung',
            {req, res},
        )}`,
    );
    const hoso = await fetch(
        'http://localhost:3000/api/users/patientData?id=' +
            getCookie('id_nguoidung', {req, res}),
    );

    return {
        props: {hascookie: await hascookie.json(), result: await hoso.json()},
    };
};

function Page(props) {
    const router = useRouter();
    const [data, setData] = useState(props.result);
    useEffect(() => {
        if (props.hascookie.result.length == 0) {
            if (!sessionStorage.getItem('currentPage')) {
                sessionStorage.setItem('currentPage', router.asPath);
            }
            router.push('/login');
        }
    }, [props.hascookie.result]);
    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/deleteProfile?id=${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.ok) {
                setData((prevData) => ({
                    ...prevData,
                    result: prevData.result.filter(
                        (patient) => patient.id_nguoidung !== id,
                    ),
                }));
            }
        } catch (error) {
            console.error('Error deleting patient record:', error);
        }
    };

    return (
        props.hascookie.result && (
            <>
                <Head>
                    <title>Chọn hồ sơ</title>
                </Head>

                <div className={layout.wrapper}>
                    <div className={layout.container}>
                        <div className={layout.route}>
                            <Link className={layout.route_link} href={'/'}>
                                Trang chủ
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link
                                className={`${layout.route_link} font_color_1da1f2`}
                                href={''}
                            >
                                Chọn hồ sơ khám bệnh
                            </Link>
                        </div>

                        <div className={layout.content}>
                            <div className={style.container}>
                                <div className={style.title}>
                                    Chọn hồ sơ bệnh nhân
                                </div>
                                {data && data.result.length === 0 ? (
                                    <p>
                                        Chưa có hồ sơ bệnh nhân. Vui lòng tạo
                                        mới
                                    </p>
                                ) : (
                                    data.result.map((item) => {
                                        return (
                                            <div
                                                key={item.id_nguoidung}
                                                className={style.items}
                                            >
                                                <div className={style.item}>
                                                    <div
                                                        className={
                                                            style.item_row
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                style.item_row_left
                                                            }
                                                        >
                                                            <CiUser /> Họ và
                                                            tên:
                                                        </div>
                                                        <div
                                                            className={
                                                                style.item_row_right
                                                            }
                                                        >
                                                            {item.ten}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            style.item_row
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                style.item_row_left
                                                            }
                                                        >
                                                            <LiaBirthdayCakeSolid />{' '}
                                                            Ngày sinh:
                                                        </div>
                                                        <div
                                                            className={
                                                                style.item_row_right
                                                            }
                                                        >
                                                            {format_date(
                                                                item.ngay_sinh,
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            style.item_row
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                style.item_row_left
                                                            }
                                                        >
                                                            <CiPhone /> Số điện
                                                            thoại:
                                                        </div>
                                                        <div
                                                            className={
                                                                style.item_row_right
                                                            }
                                                        >
                                                            {item.sdt}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.sub}>
                                                    <div
                                                        className={
                                                            style.btnTrash
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id_nguoidung,
                                                            )
                                                        }
                                                    >
                                                        <CiTrash />
                                                        Xóa
                                                    </div>
                                                    <div
                                                        className={
                                                            style.btnEdit
                                                        }
                                                        onClick={() => {
                                                            sessionStorage.setItem(
                                                                'curentpage2',
                                                                router.pathname,
                                                            );
                                                            router.push({
                                                                pathname:
                                                                    '/editprofile',
                                                                query: {
                                                                    id: item.id_nguoidung,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        <CiEdit />
                                                        Sửa
                                                    </div>

                                                    <div
                                                        className={style.btn}
                                                        onClick={() => {
                                                            sessionStorage.setItem(
                                                                'id_user',
                                                                item.id_nguoidung,
                                                            );
                                                            router.push(
                                                                '/dat-lich/xac-nhan-thong-tin',
                                                            );
                                                        }}
                                                    >
                                                        <MdNavigateNext />
                                                        Tiếp tục
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div className={style.right_container_down}>
                                    <button
                                        className={style.right_button_left}
                                        onClick={() => router.back()}
                                    >
                                        Quay lại
                                        <AiOutlineRollback className="ml_4" />
                                    </button>
                                    <button
                                        className={style.right_button_right}
                                        onClick={() => {
                                            sessionStorage.setItem(
                                                'curentpage2',
                                                router.pathname,
                                            );
                                            router.push('/addNewProfile');
                                        }}
                                    >
                                        Thêm hồ sơ
                                    </button>
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
