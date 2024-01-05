import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {hasCookie, getCookie} from 'cookies-next';

import {useState, useEffect, useRef} from 'react';

import style from '@/styles/datLich/chonKhoa.module.css';
import xacNhan from '@/styles/datLich/xacNhan.module.css';
import {
    MdKeyboardArrowRight,
    MdOutlineMail,
    MdOutlineHome,
} from 'react-icons/md';
import {
    FaHospitalAlt,
    FaRegEdit,
    FaRegCalendarAlt,
    FaRegUser,
} from 'react-icons/fa';
import {AiOutlineRollback} from 'react-icons/ai';
import {PiGenderIntersex} from 'react-icons/pi';
import {FiPhone} from 'react-icons/fi';

import dataCountry from '../../../../public/data/data';
import {format_date, checkDataCountry} from '@/functions/xoa_dau';

export async function getServerSideProps({req, res}) {
    const hascookie = await fetch(
        `http://localhost:3000/api/users/getDataUser?id=${getCookie(
            'id_nguoidung',
            {req, res},
        )}`,
    );
    const posts = await fetch('http://localhost:3000/api/khoa/getAllKhoa_name');

    return {
        props: {hascookie: await hascookie.json(), result: await posts.json()},
    };
}

function Page(props) {
    const noti = useRef();
    const btn_text = useRef();
    const btn = useRef();
    const loader = useRef();
    const [data, setData] = useState();
    const [user, setUser] = useState();
    const [id, setId] = useState();
    const router = useRouter();

    useEffect(() => {
        if (props.hascookie.result.length == 0) {
            if (!sessionStorage.getItem('currentPage')) {
                sessionStorage.setItem('currentPage', router.asPath);
            }
            router.push('/login');
        }
    }, [props.hascookie.result]);
    useEffect(() => {
        setData(JSON.parse(sessionStorage.getItem('query_lich')));
    }, [props.hascookie]);
    useEffect(() => {
        const res = async () => {
            const x = await fetch(
                `http://localhost:3000/api/users/getDataPatient?id=${sessionStorage.getItem(
                    'id_user',
                )}`,
            ).then((response) => {
                return response.json();
            });
            setUser(x);
        };
        res();
    }, []);

    async function handleSave() {
        const x = await fetch(`http://localhost:3000/api/users/datLich`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                info: data,
                id_nguoibenh: user.result[0].id_nguoidung,
            }),
        }).then((response) => {
            return response.json();
        });

        if (x.result) {
            setId(x.result);
            noti.current.style.animation = 'a 3s ease-in-out';
        }
    }

    noti.current &&
        (noti.current.onanimationend = () => {
            router.push({
                pathname: '/dat-lich/hinh-thuc-thanh-toan',
                query: {
                    id: id,
                },
            });
        });

    return (
        props.hascookie.result && (
            <>
                <Head>
                    <title>Xác nhận thông tin - Đặt lịch khám bệnh</title>
                </Head>

                <div className={style.wrapper}>
                    <div className={style.container}>
                        <div className={style.route}>
                            <Link className={style.route_link} href={'/'}>
                                Trang chủ
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link className={style.route_link} href={''}>
                                Đặt lịch
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link
                                className={style.route_link}
                                href={'/dat-lich/chon-khoa'}
                            >
                                Chọn chuyên khoa
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link
                                className={style.route_link}
                                href={{
                                    pathname: '/dat-lich/chon-ngay',
                                    query: {id_khoa: data && data.id_khoa},
                                }}
                            >
                                Chọn ngày khám
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link
                                className={style.route_link}
                                href={{
                                    pathname: '/dat-lich/chon-ngay',
                                    query: {
                                        id_khoa: data && data.id_khoa,
                                        ngay: data && data.ngay,
                                    },
                                }}
                            >
                                Chọn giờ khám
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link
                                className={style.route_link}
                                href={'/chon-ho-so'}
                            >
                                Chọn hồ sơ
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link
                                className={`${style.route_link} font_color_1da1f2`}
                                href={''}
                            >
                                Xác nhận thông tin
                            </Link>
                        </div>

                        <div className={style.content}>
                            <div className={style.left}>
                                <div className={style.left_container}>
                                    <div className={style.title}>
                                        Thông tin đặt lịch khám
                                    </div>
                                    <div className={style.left_body}>
                                        <ul>
                                            <li
                                                className={style.left_body_item}
                                            >
                                                <div
                                                    className={style.item_icon}
                                                >
                                                    <FaHospitalAlt
                                                        className={'w20_hf'}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        style.item_content
                                                    }
                                                >
                                                    <p>
                                                        Bệnh viện MedConnect
                                                        TP.HCM
                                                    </p>
                                                    <p className="font_color_858585 font_size_14">
                                                        180 Cao Lỗ, Phường 4,
                                                        Quận 8, TP. Hồ Chí Minh
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* right */}
                            <div className={style.right}>
                                <div className={style.right_container}>
                                    <div className={style.title}>
                                        Xác nhận lịch khám{' '}
                                        <FaRegEdit
                                            className={style.title_edit}
                                            onClick={() => {
                                                router.push(
                                                    '/dat-lich/chon-khoa',
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className={style.right_body}>
                                        <ul className={xacNhan.items_title}>
                                            <li className={xacNhan.item_2}>
                                                Chuyên khoa
                                            </li>
                                            <li className={xacNhan.item}>
                                                Ngày khám
                                            </li>
                                            <li className={xacNhan.item}>
                                                Thời gian dự kiến
                                            </li>
                                            <li className={xacNhan.item}>
                                                Tiền khám
                                            </li>
                                        </ul>
                                        <ul className={xacNhan.items}>
                                            {data && (
                                                <>
                                                    <li
                                                        className={
                                                            xacNhan.item_2
                                                        }
                                                    >
                                                        Khám{' '}
                                                        {props.result.data
                                                            .filter(
                                                                (value) =>
                                                                    value.id_khoa ==
                                                                    data.id_khoa,
                                                            )
                                                            .map(
                                                                (value) =>
                                                                    value.ten_khoa,
                                                            )}
                                                    </li>
                                                    <li
                                                        className={xacNhan.item}
                                                    >
                                                        {data.ngay}
                                                    </li>
                                                    <li
                                                        className={xacNhan.item}
                                                    >
                                                        {data.gio}
                                                    </li>
                                                    <li
                                                        className={xacNhan.item}
                                                    >
                                                        150.000 đ
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div
                                    className={`${style.right_container} mt_40`}
                                >
                                    <div className={style.title}>
                                        Xác nhận thông tin người khám
                                        <FaRegEdit
                                            className={style.title_edit}
                                            onClick={() => {
                                                router.push(
                                                    '/dat-lich/cap-nhat-thong-tin',
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className={style.right_body}>
                                        {user && user.result && (
                                            <ul className={xacNhan.items_infor}>
                                                <li className={xacNhan.item}>
                                                    <FaRegUser
                                                        className={
                                                            xacNhan.item_icon
                                                        }
                                                    />
                                                    <p
                                                        className={
                                                            xacNhan.item_title
                                                        }
                                                    >
                                                        Họ tên:{' '}
                                                    </p>
                                                    <p
                                                        className={
                                                            xacNhan.item_value
                                                        }
                                                    >
                                                        {user.result[0].ten}
                                                    </p>
                                                </li>
                                                <li className={xacNhan.item}>
                                                    <PiGenderIntersex
                                                        className={
                                                            xacNhan.item_icon
                                                        }
                                                    />
                                                    <p
                                                        className={
                                                            xacNhan.item_title
                                                        }
                                                    >
                                                        Giới tính:
                                                    </p>
                                                    <p
                                                        className={
                                                            xacNhan.item_value
                                                        }
                                                    >
                                                        {user.result[0]
                                                            .gioi_tinh == 'nam'
                                                            ? 'Nam'
                                                            : 'Nữ'}
                                                    </p>
                                                </li>
                                                <li className={xacNhan.item}>
                                                    <FaRegCalendarAlt
                                                        className={
                                                            xacNhan.item_icon
                                                        }
                                                    />
                                                    <p
                                                        className={
                                                            xacNhan.item_title
                                                        }
                                                    >
                                                        Ngày sinh:
                                                    </p>
                                                    <p
                                                        className={
                                                            xacNhan.item_value
                                                        }
                                                    >
                                                        {format_date(
                                                            user.result[0]
                                                                .ngay_sinh,
                                                        )}
                                                    </p>
                                                </li>
                                                <li className={xacNhan.item}>
                                                    <MdOutlineMail
                                                        className={
                                                            xacNhan.item_icon
                                                        }
                                                    />
                                                    <p
                                                        className={
                                                            xacNhan.item_title
                                                        }
                                                    >
                                                        Email:
                                                    </p>
                                                    <p
                                                        className={
                                                            xacNhan.item_value
                                                        }
                                                    >
                                                        {user.result[0].email}
                                                    </p>
                                                </li>
                                                <li className={xacNhan.item}>
                                                    <FiPhone
                                                        className={
                                                            xacNhan.item_icon
                                                        }
                                                    />
                                                    <p
                                                        className={
                                                            xacNhan.item_title
                                                        }
                                                    >
                                                        Số điện thoại:
                                                    </p>
                                                    <p
                                                        className={
                                                            xacNhan.item_value
                                                        }
                                                    >
                                                        {user.result[0].sdt}
                                                    </p>
                                                </li>
                                                <li className={xacNhan.item}>
                                                    <MdOutlineHome
                                                        className={
                                                            xacNhan.item_icon
                                                        }
                                                    />
                                                    <p
                                                        className={
                                                            xacNhan.item_title
                                                        }
                                                    >
                                                        Địa chỉ:
                                                    </p>
                                                    <p
                                                        className={
                                                            xacNhan.item_value
                                                        }
                                                    >
                                                        {checkDataCountry(
                                                            user.result[0].dia_chi.split(
                                                                ', ',
                                                            ),
                                                            dataCountry,
                                                        )}
                                                    </p>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className={style.right_container_down}>
                                    <button
                                        className={style.right_button_left}
                                        onClick={() => router.back()}
                                    >
                                        Quay lại
                                        <AiOutlineRollback className="ml_4" />
                                    </button>
                                    <button
                                        ref={btn}
                                        className={style.right_button_right}
                                        onClick={(e) => {
                                            btn.current.disabled = true;
                                            btn.current &&
                                                (btn.current.style.cursor =
                                                    'no-drop');
                                            btn.current &&
                                                (btn.current.style.background =
                                                    '#e8e8e8');
                                            btn_text.current &&
                                                (btn_text.current.style.display =
                                                    'none');
                                            loader.current &&
                                                (loader.current.style.display =
                                                    'flex');
                                            handleSave();
                                        }}
                                    >
                                        <div ref={btn_text}>Xác nhận</div>
                                        <div ref={loader} className="loader">
                                            <div className="box-load1">
                                                {''}
                                            </div>
                                            <div className="box-load2"></div>
                                            <div className="box-load3"></div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={noti} className={style.noti}>
                        <img src="data:image/png;base64,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" />
                        Thành công
                    </div>
                </div>
            </>
        )
    );
}

export default Page;
