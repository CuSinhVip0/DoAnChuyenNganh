import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/datLich/chonKhoa.module.css';
import {FaClock} from 'react-icons/fa6';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt, FaCalendarAlt} from 'react-icons/fa';
import {FaBriefcaseMedical} from 'react-icons/fa6';
import {AiOutlineRollback} from 'react-icons/ai';
import {useRef} from 'react';
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';
import UpdateInfor from '@/component/updateinfor';
import data from '../../../../public/data/data.json';
export function getServerSideProps({req, res}) {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
}

function Page(props) {
    const router = useRouter();
    const form = useRef();

    return (
        <>
            <Head>
                <title>Đặt lịch khám bệnh - Chọn giờ khám</title>
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
                        <Link
                            className={`${style.route_link} font_color_1da1f2`}
                            href={''}
                        >
                            Cập nhật thông tin
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
                                        <li className={style.left_body_item}>
                                            <div className={style.item_icon}>
                                                <FaBriefcaseMedical
                                                    className={'w20_hf'}
                                                />
                                            </div>
                                            <div className={style.item_content}>
                                                <p>Chuyên khoa: Tai mũi họng</p>
                                            </div>
                                        </li>
                                        <li className={style.left_body_item}>
                                            <div className={style.item_icon}>
                                                <FaCalendarAlt
                                                    className={'w20_hf'}
                                                />
                                            </div>
                                            <div className={style.item_content}>
                                                <p>Ngày khám: 01-12-2023</p>
                                            </div>
                                        </li>
                                        <li className={style.left_body_item}>
                                            <div className={style.item_icon}>
                                                <FaClock className={'w20_hf'} />
                                            </div>
                                            <div className={style.item_content}>
                                                <p>Giờ khám: 10:00 - 11:00</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* right */}
                        <div className={style.right}>
                            <div className={style.right_container}>
                                <div
                                    className={` ${style.title} text_align_center`}
                                >
                                    Cập nhật thông tin
                                </div>
                                <UpdateInfor ref_form={form} />
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
