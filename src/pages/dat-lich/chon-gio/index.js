import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';

import {useEffect, useRef} from 'react';

import style from '@/styles/datLich/chonKhoa.module.css';
import chonGio from '@/styles/datLich/chonGio.module.css';

import {FaClock} from 'react-icons/fa6';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt} from 'react-icons/fa';
import {FaBriefcaseMedical} from 'react-icons/fa6';
import {AiOutlineRollback} from 'react-icons/ai';

export function getServerSideProps({req, res}) {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
}
function Page(props) {
    const router = useRouter();

    // useEffect(() => {
    //     const x = Object.entries(
    //         JSON.parse(sessionStorage.getItem('query_lich')),
    //     );
    //     const x2 = x.filter((item) => item[0] != 'gio');
    //     const x3 = x2.reduce((acc, [key, value]) => {
    //         acc[key] = value;
    //         return acc;
    //     }, {});

    //     sessionStorage.setItem('query_lich', JSON.stringify(x3));

    //     router.push({
    //         pathname: '/dat-lich/chon-gio',
    //         query: JSON.parse(sessionStorage.getItem('query_lich')),
    //     });
    // }, []);

    const handleAddTime = (time) => {
        sessionStorage.setItem(
            'query_lich',
            JSON.stringify({
                id_khoa: router.query.id_khoa,
                ngay: router.query.ngay,
                gio: time,
            }),
        );
        router.push({
            pathname: '/dat-lich/cap-nhat-thong-tin',
            // query: {
            //     ...JSON.parse(sessionStorage.getItem('query_lich')),
            //     gio: time,
            // },
        });
    };

    return (
        <>
            <Head>
                <title>Đặt lịch khám bệnh - Chọn giờ khám</title>
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
                                query: {id_khoa: router.query.id_khoa},
                            }}
                        >
                            Chọn ngày khám
                        </Link>
                        <MdKeyboardArrowRight className="mlr_4px" />

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
                                                <p>
                                                    Ngày khám:{' '}
                                                    {router.query['ngay']}
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
                                                <li
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '07:00 - 07:30',
                                                        )
                                                    }
                                                    className={chonGio.item}
                                                >
                                                    07:00 - 07:30
                                                </li>{' '}
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '07:30 - 08:30',
                                                        )
                                                    }
                                                >
                                                    07:30 - 08:30
                                                </li>
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '08:30 - 09:30',
                                                        )
                                                    }
                                                >
                                                    08:30 - 09:30
                                                </li>
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '09:30 - 10:30',
                                                        )
                                                    }
                                                >
                                                    09:30 - 10:30
                                                </li>
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '10:30 - 11:00',
                                                        )
                                                    }
                                                >
                                                    10:30 - 11:00
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
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '13:00 - 13:30',
                                                        )
                                                    }
                                                >
                                                    13:00 - 13:30
                                                </li>
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '13:30 - 14:30',
                                                        )
                                                    }
                                                >
                                                    13:30 - 14:30
                                                </li>
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '14:30 - 15:30',
                                                        )
                                                    }
                                                >
                                                    14:30 - 15:30
                                                </li>
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '15:30 - 16:30',
                                                        )
                                                    }
                                                >
                                                    15:30 - 16:30
                                                </li>
                                                <li
                                                    className={chonGio.item}
                                                    onClick={() =>
                                                        handleAddTime(
                                                            '16:30 - 17:00',
                                                        )
                                                    }
                                                >
                                                    16:30 - 17:00
                                                </li>
                                            </ul>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
