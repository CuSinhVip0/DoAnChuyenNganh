import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';

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
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';

export const getServerSideProps = ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
};

function Page(props) {
    const router = useRouter();
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
                        <Link className={style.route_link} href={''}>
                            Đặt lịch
                        </Link>
                        <MdKeyboardArrowRight className="mlr_4px" />
                        <Link className={style.route_link} href={''}>
                            Chọn chuyên khoa
                        </Link>
                        <MdKeyboardArrowRight className="mlr_4px" />
                        <Link className={style.route_link} href={''}>
                            Chọn ngày khám
                        </Link>
                        <MdKeyboardArrowRight className="mlr_4px" />
                        <Link className={style.route_link} href={''}>
                            Chọn giờ khám
                        </Link>
                        <MdKeyboardArrowRight className="mlr_4px" />
                        <Link className={style.route_link} href={''}>
                            Cập nhật thông tin
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
                                        <li className={style.left_body_item}>
                                            <div className={style.item_icon}>
                                                <FaHospitalAlt
                                                    className={'w20_hf'}
                                                />
                                            </div>
                                            <div className={style.item_content}>
                                                <p>
                                                    Bệnh viện Đại học Y Dược
                                                    TP.HCM
                                                </p>
                                                <p className="font_color_858585 font_size_14">
                                                    Cơ sở 201 Nguyễn Chí Thanh,
                                                    Phường 12, Quận 5, TP. Hồ
                                                    Chí Minh
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
                                    <FaRegEdit className={style.title_edit} />
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
                                        <li className={xacNhan.item_2}>
                                            Khám tai mũi họng
                                        </li>
                                        <li className={xacNhan.item}>
                                            27/05/2022
                                        </li>
                                        <li className={xacNhan.item}>
                                            10:00 - 11:00
                                        </li>
                                        <li className={xacNhan.item}>
                                            150.000 đ
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`${style.right_container} mt_40`}>
                                <div className={style.title}>
                                    Xác nhận thông tin người khám
                                    <FaRegEdit className={style.title_edit} />
                                </div>
                                <div className={style.right_body}>
                                    <ul className={xacNhan.items_infor}>
                                        <li className={xacNhan.item}>
                                            <FaRegUser
                                                className={xacNhan.item_icon}
                                            />
                                            <p className={xacNhan.item_title}>
                                                Họ tên:{' '}
                                            </p>
                                            <p className={xacNhan.item_value}>
                                                Bường Nguyễn C
                                            </p>
                                        </li>
                                        <li className={xacNhan.item}>
                                            <PiGenderIntersex
                                                className={xacNhan.item_icon}
                                            />
                                            <p className={xacNhan.item_title}>
                                                Giới tính:
                                            </p>
                                            <p className={xacNhan.item_value}>
                                                Nam
                                            </p>
                                        </li>
                                        <li className={xacNhan.item}>
                                            <FaRegCalendarAlt
                                                className={xacNhan.item_icon}
                                            />
                                            <p className={xacNhan.item_title}>
                                                Ngày sinh:
                                            </p>
                                            <p className={xacNhan.item_value}>
                                                01/01/2000
                                            </p>
                                        </li>
                                        <li className={xacNhan.item}>
                                            <MdOutlineMail
                                                className={xacNhan.item_icon}
                                            />
                                            <p className={xacNhan.item_title}>
                                                Email:
                                            </p>
                                            <p className={xacNhan.item_value}>
                                                buongnguyenC@gmail.com
                                            </p>
                                        </li>
                                        <li className={xacNhan.item}>
                                            <FiPhone
                                                className={xacNhan.item_icon}
                                            />
                                            <p className={xacNhan.item_title}>
                                                Số điện thoại:
                                            </p>
                                            <p className={xacNhan.item_value}>
                                                0982232131
                                            </p>
                                        </li>
                                        <li className={xacNhan.item}>
                                            <MdOutlineHome
                                                className={xacNhan.item_icon}
                                            />
                                            <p className={xacNhan.item_title}>
                                                Địa chỉ:
                                            </p>
                                            <p className={xacNhan.item_value}>
                                                283 Hẻm 285 Cách Mạng Tháng Tám,
                                                Phường 12, Quận 10, Thành phố Hồ
                                                Chí Minh
                                            </p>
                                        </li>
                                    </ul>
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
                                    className={style.right_button_right}
                                    onClick={() => console.log(form)}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
