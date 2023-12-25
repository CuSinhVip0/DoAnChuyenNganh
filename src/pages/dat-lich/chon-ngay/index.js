'use client';

import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';

import {useRef, useEffect, useState} from 'react';

import style from '@/styles/datLich/chonKhoa.module.css';
import chonNgay from '@/styles/datLich/chonNgay.module.css';

import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt} from 'react-icons/fa';
import {AiOutlineRollback} from 'react-icons/ai';
import {
    FaBriefcaseMedical,
    FaCircleChevronLeft,
    FaCircleChevronRight,
} from 'react-icons/fa6';

export async function getServerSideProps({req, res}) {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    const posts = await fetch('http://localhost:3000/api/khoa/getAllKhoa_name');
    return {props: {hascookie, result: await posts.json()}};
}

function Page(props) {
    var indexx = 1;
    const router = useRouter();
    const [valid, setValid] = useState(false);

    // // set lại query string khi back
    // useEffect(() => {
    //     const x = Object.entries(
    //         JSON.parse(sessionStorage.getItem('query_lich')),
    //     );
    //     const x2 = x.filter((item) => item[0] != 'id_ngay');
    //     const x3 = x2.reduce((acc, [key, value]) => {
    //         acc[key] = value;
    //         return acc;
    //     }, {});

    //     sessionStorage.setItem('query_lich', JSON.stringify(x3));

    //     router.push({
    //         pathname: '/dat-lich/chon-ngay',
    //         query: JSON.parse(sessionStorage.getItem('query_lich')),
    //     });
    // }, []);

    const dateRef = useRef();
    //ngay thang nam hien tai
    const d = new Date();
    const [year, setYear] = useState(d.getFullYear());
    const [month, setMonth] = useState(d.getMonth() + 1);

    //lay so ngay trong thang
    const date = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

    //thu cua ngay dau tien trong thang
    var day = new Date(`${year}-${month}-1`).getDay();
    if (day == 0) day = 7;

    const handleaddNgay = (date) => {
        // sessionStorage.setItem(
        //     'query_lich',
        //     JSON.stringify({
        //         ...JSON.parse(sessionStorage.getItem('query_lich')),
        //         id_ngay: date,
        //     }),
        // );
        router.push({
            pathname: '/dat-lich/chon-gio',
            query: {
                // ...JSON.parse(sessionStorage.getItem('query_lich')),
                ...router.query,
                ngay: date,
            },
        });
    };

    useEffect(() => {
        if (
            year > new Date().getFullYear() ||
            month > new Date().getMonth() + 1
        )
            setValid(true);
        else {
            setValid(false);
        }
    }, [year, month]);
    const show1 = () => {
        var day_truoc = new Date(year, month - 1, 0).getDate();
        const x = day_truoc - (day_truoc - day + 2);
        const numbers = Array.from(
            {length: x + 1},
            (_, index) => index + (day_truoc - day + 2),
        );
        return (
            <>
                {numbers.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={`${
                                chonNgay.date_item
                            } font_color_b3b7ba ${
                                indexx++ % 7 == 0 ? 'border_right_non' : ''
                            }`}
                        >
                            {item}
                        </li>
                    );
                })}
            </>
        );
    };
    const show2 = () => {
        var day_hientai = d.getDate();

        const numbers = Array.from({length: date}, (_, index) => index + 1);
        //xu ly truoc
        return (
            <>
                {numbers.map((item, index) => {
                    const date = `${item}/${month}/${year}`;
                    return (
                        <li
                            onClick={() =>
                                index + 1 > day_hientai
                                    ? handleaddNgay(date)
                                    : null
                            }
                            key={index}
                            className={`${chonNgay.date_item} ${
                                index + 1 <= day_hientai
                                    ? !valid
                                        ? 'font_color_b3b7ba'
                                        : ''
                                    : 'item_hover'
                            } ${indexx++ % 7 == 0 ? 'border_right_non' : ''}`}
                        >
                            {item}
                        </li>
                    );
                })}
            </>
        );
    };
    const show3 = () => {
        // lấy số ngày còn lại để  điền vào dòng cuối
        var date_sau = new Date(`${year}-${month}-${date}`).getDay();
        if (date_sau == 0) {
            date_sau = 7;
        }
        const numbers = Array.from(
            {length: 7 - date_sau},
            (_, index) => index + 1,
        );

        //xu ly truoc
        return (
            <>
                {numbers.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={`${
                                chonNgay.date_item
                            } font_color_b3b7ba ${
                                indexx++ % 7 == 0 ? 'border_right_non' : ''
                            }`}
                        >
                            {item}
                        </li>
                    );
                })}
            </>
        );
    };

    return (
        <>
            <Head>
                <title>Đặt lịch khám bệnh - Chọn khoa khám</title>
            </Head>

            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.route}>
                        <Link className={style.route_link} href={'/'}>
                            Trang chủ
                        </Link>
                        <MdKeyboardArrowRight className="mlr_4px" />
                        <p className={style.route_link}>Đặt lịch</p>
                        <MdKeyboardArrowRight className="mlr_4px" />
                        <Link
                            className={style.route_link}
                            href={'/dat-lich/chon-khoa'}
                        >
                            Chọn chuyên khoa
                        </Link>
                        <MdKeyboardArrowRight className="mlr_4px" />
                        <p className={`${style.route_link} font_color_1da1f2`}>
                            Chọn ngày khám
                        </p>
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
                                                <p>
                                                    Chuyên khoa:{' '}
                                                    {props.result.data
                                                        .filter(
                                                            (prop) =>
                                                                prop.id_khoa ==
                                                                router.query[
                                                                    'id_khoa'
                                                                ],
                                                        )
                                                        .map(
                                                            (propx) =>
                                                                propx.ten_khoa,
                                                        )}
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
                                    Chọn ngày khám
                                </div>
                                <div className={chonNgay.right_mouth}>
                                    <div className={chonNgay.mouth_container}>
                                        <FaCircleChevronLeft
                                            className={`${
                                                chonNgay.mouth_container_icon
                                            }  ${valid ? '' : ' no_click'}`}
                                            onClick={() => {
                                                if (valid) {
                                                    if (month == 1) {
                                                        setMonth(12);
                                                        setYear(year - 1);
                                                    } else {
                                                        setMonth(month - 1);
                                                    }
                                                }
                                            }}
                                        />
                                        <p>
                                            THÁNG {month}, {year}
                                        </p>
                                        <FaCircleChevronRight
                                            className={
                                                chonNgay.mouth_container_icon
                                            }
                                            onClick={() => {
                                                if (month == 12) {
                                                    setMonth(1);
                                                    setYear(year + 1);
                                                } else {
                                                    setMonth(month + 1);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={chonNgay.right_day}>
                                    <ul className={chonNgay.day_container}>
                                        <li className={chonNgay.day_item}>
                                            Hai
                                        </li>
                                        <li className={chonNgay.day_item}>
                                            Ba
                                        </li>
                                        <li className={chonNgay.day_item}>
                                            Tư
                                        </li>
                                        <li className={chonNgay.day_item}>
                                            Năm
                                        </li>
                                        <li className={chonNgay.day_item}>
                                            Sáu
                                        </li>
                                        <li className={chonNgay.day_item}>
                                            Bảy
                                        </li>
                                        <li
                                            className={`${chonNgay.day_item} border_right_non`}
                                        >
                                            Chủ nhật
                                        </li>
                                    </ul>
                                </div>
                                <div className={chonNgay.right_date}>
                                    <ul
                                        className={chonNgay.date_container}
                                        ref={dateRef}
                                    >
                                        {show1()}
                                        {show2()}
                                        {show3()}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
