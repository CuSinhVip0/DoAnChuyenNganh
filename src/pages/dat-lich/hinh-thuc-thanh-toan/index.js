import Nav from '@/component/nav';
import Head from 'next/head';
import {hasCookie} from 'cookies-next';
import Link from 'next/link';
import style from '@/styles/datLich/chonKhoa.module.css';
import thanhtoan from '@/styles/datLich/thanhtoan.module.css';
import {
    FaHospitalAlt,
    FaRegCalendarAlt,
    FaRegClock,
    FaRegUser,
    FaRegCreditCard,
} from 'react-icons/fa';
import {MdOutlineHome} from 'react-icons/md';
import {AiOutlineRollback} from 'react-icons/ai';
import {FaBriefcaseMedical} from 'react-icons/fa';

import {FiPhone} from 'react-icons/fi';
import {MdKeyboardArrowRight} from 'react-icons/md';
function Page(props) {
    return (
        <>
            <Head>
                <title>Đặt lịch khám bệnh - Chọn hình thức thanh toán</title>
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
                            Hình thức thanh toán
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
                            <div className={`${style.left_container} mt_40`}>
                                <div className={style.title}>
                                    Thông tin bệnh nhân
                                </div>
                                <div className={style.left_body}>
                                    <ul>
                                        <li className={style.left_body_item}>
                                            <div className={style.item_icon}>
                                                <FaRegUser />
                                            </div>
                                            <div className={style.item_content}>
                                                <p>Bường Nguyễn C</p>
                                            </div>
                                        </li>
                                        <li className={style.left_body_item}>
                                            <div className={style.item_icon}>
                                                <FiPhone />
                                            </div>
                                            <div className={style.item_content}>
                                                <p>0982232131</p>
                                            </div>
                                        </li>
                                        <li className={style.left_body_item}>
                                            <div className={style.item_icon}>
                                                <MdOutlineHome />
                                            </div>
                                            <div className={style.item_content}>
                                                <p>
                                                    283 Hẻm 285 Cách Mạng Tháng
                                                    Tám, Phường 12, Quận 10,
                                                    Thành phố Hồ Chí Minh
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
                                    Hình thức thanh toán
                                </div>
                                <div className={style.right_body}>
                                    <div className={thanhtoan.container}>
                                        <div className={thanhtoan.left}>
                                            <div
                                                className={thanhtoan.left_item}
                                            >
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="thanhtoan"
                                                    />
                                                    Thanh toán bằng momo
                                                </label>
                                            </div>
                                            <div
                                                className={thanhtoan.left_item}
                                            >
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="thanhtoan"
                                                    />
                                                    Thanh toán bằng QR Code /
                                                    Mobile banking
                                                </label>
                                            </div>
                                        </div>
                                        <div className={thanhtoan.right}>
                                            <div
                                                className={
                                                    thanhtoan.right_title
                                                }
                                            >
                                                <FaRegCreditCard className="mr_4" />
                                                Thông tin thanh toán
                                            </div>
                                            <div
                                                className={thanhtoan.right_body}
                                            >
                                                <ul>
                                                    <li
                                                        className={
                                                            thanhtoan.body_item
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                thanhtoan.body_item_title
                                                            }
                                                        >
                                                            <FaBriefcaseMedical className="mr_4" />{' '}
                                                            Chuyên khoa
                                                        </div>
                                                        <div
                                                            className={
                                                                thanhtoan.body_item_value
                                                            }
                                                        >
                                                            Khám chức năng hô
                                                            hấp
                                                        </div>
                                                    </li>
                                                    <li
                                                        className={
                                                            thanhtoan.body_item
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                thanhtoan.body_item_title
                                                            }
                                                        >
                                                            <FaRegCalendarAlt className="mr_4" />{' '}
                                                            Ngày khám
                                                        </div>
                                                        <div
                                                            className={
                                                                thanhtoan.body_item_value
                                                            }
                                                        >
                                                            28/02/2202
                                                        </div>
                                                    </li>
                                                    <li
                                                        className={
                                                            thanhtoan.body_item
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                thanhtoan.body_item_title
                                                            }
                                                        >
                                                            <FaRegClock className="mr_4" />{' '}
                                                            Giờ khám
                                                        </div>
                                                        <div
                                                            className={
                                                                thanhtoan.body_item_value
                                                            }
                                                        >
                                                            11:00 - 12:00
                                                        </div>
                                                    </li>
                                                    <li
                                                        className={`${thanhtoan.body_item} border_non`}
                                                    >
                                                        <div
                                                            className={
                                                                thanhtoan.body_item_title
                                                            }
                                                        >
                                                            Tiền khám
                                                        </div>
                                                        <div
                                                            className={`${thanhtoan.body_item_value} font_color_1da1f2 font_weight_600 `}
                                                        >
                                                            150.000 VND
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div
                                                className={
                                                    thanhtoan.body_result
                                                }
                                            >
                                                <div
                                                    className={
                                                        thanhtoan.body_result_title
                                                    }
                                                >
                                                    Tổng cộng:
                                                </div>
                                                <div
                                                    className={`${thanhtoan.body_item_value} font_color_1da1f2  `}
                                                >
                                                    150.000 VND
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function getServerSideProps({req, res}) {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
}

export default Page;
