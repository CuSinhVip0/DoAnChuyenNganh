import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/datLich/chonKhoa.module.css';
import chonGio from '@/styles/datLich/chonGio.module.css';
import {FaClock} from 'react-icons/fa6';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt} from 'react-icons/fa';
import {FaBriefcaseMedical} from 'react-icons/fa6';
import {AiOutlineRollback} from 'react-icons/ai';
import {useRef} from 'react';
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';

export function getServerSideProps({req, res}) {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
}

function Page(props) {
    const router = useRouter();
    const dateRef = useRef();

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
                        <Link className={style.route_link}>Chọn ngày khám</Link>
                        <Link
                            className={`${style.route_link} font_color_1da1f2`}
                            href={''}
                        >
                            Chọn giờ khám
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
                                                <FaClock className={'w20_hf'} />
                                            </div>
                                            <div className={style.item_content}>
                                                <p>Ngày khám: 01-12-2023</p>
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
                                    Chọn giờ khám
                                </div>
                                <div className={chonGio.container}>
                                    <div className={chonGio.container_content}>
                                        <div className={chonGio.title}>
                                            Buổi sáng
                                        </div>
                                        <div className={chonGio.items}>
                                            <ul>
                                                <li className={chonGio.item}>
                                                    07:00 - 08:00
                                                </li>{' '}
                                                <li className={chonGio.item}>
                                                    07:00 - 08:00
                                                </li>
                                                <li className={chonGio.item}>
                                                    08:00 - 09:00
                                                </li>
                                                <li className={chonGio.item}>
                                                    09:00 - 10:00
                                                </li>
                                                <li className={chonGio.item}>
                                                    10:00 - 11:00
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <hr className="linear_00b5f1_00e0ff_36 border_non mtb_20 h2"></hr>
                                    <div className={chonGio.container_content}>
                                        <div className={chonGio.title}>
                                            Buổi chiều
                                        </div>
                                        <div className={chonGio.items}>
                                            <ul>
                                                <li className={chonGio.item}>
                                                    07:00 - 08:00
                                                </li>
                                                <li className={chonGio.item}>
                                                    08:00 - 09:00
                                                </li>
                                                <li className={chonGio.item}>
                                                    09:00 - 10:00
                                                </li>
                                                <li className={chonGio.item}>
                                                    10:00 - 11:00
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className={style.right_button}
                                onClick={() => router.back()}
                            >
                                Quay lại
                                <AiOutlineRollback className="ml_4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
