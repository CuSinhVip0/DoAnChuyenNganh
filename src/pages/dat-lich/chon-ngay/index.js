import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';
import style from '@/styles/datLich/chonKhoa.module.css';
import chonNgay from '@/styles/datLich/chonNgay.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt} from 'react-icons/fa';
import {
    FaBriefcaseMedical,
    FaCircleChevronLeft,
    FaCircleChevronRight,
} from 'react-icons/fa6';
import {AiOutlineRollback} from 'react-icons/ai';
import {useRef, useEffect} from 'react';
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';

export function getServerSideProps({req, res}) {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
}

function Page(props) {
    const router = useRouter();
    const dateRef = useRef();

    //ngay thang nam hien tai
    const d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;

    //lay so ngay trong thang
    const date = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

    //thu cua ngay dau tien trong thang
    var day = new Date(`${year}-${month}-1`).getDay();
    if (day == 0) day = 7;

    function showDate() {
        //check ngay thu 7 trong bang
        var day_is_7 = 1;
        //xu ly truoc
        var day_truoc = new Date(year, month - 1, 0).getDate();
        for (var i = day_truoc - day + 2; i <= day_truoc; i++) {
            dateRef.current.innerHTML += ` <li class='${
                chonNgay.date_item
            } font_color_b3b7ba ${day_is_7 == 7 ? 'border_right_non' : ''}'  >
            ${i}
            
        </li>`;
            day_is_7++;
            if (day_is_7 == 8) day_is_7 = 1;
        }

        //xu lys ngay trong thang
        var day_hientai = d.getDate();
        for (var i = 1; i <= date; i++) {
            dateRef.current.innerHTML += ` <li class='${chonNgay.date_item} ${
                i <= day_hientai ? 'font_color_b3b7ba' : 'item_hover'
            } ${day_is_7 == 7 ? 'border_right_non' : ''}'>
            ${i}
        </li>`;
            day_is_7++;
            if (day_is_7 == 8) day_is_7 = 1;
        }

        //xy ly sau
        var date_sau = new Date(`${year}-${month}-${date}`).getDay();
        if (date_sau == 0) {
            date_sau = 7;
        }
        for (var i = 1; i <= 7 - date_sau; i++) {
            dateRef.current.innerHTML += ` <li class='${
                chonNgay.date_item
            } font_color_b3b7ba ${day_is_7 == 7 ? 'border_right_non' : ''}'>
            ${i}
        </li>`;
            day_is_7++;
            if (day_is_7 == 8) day_is_7 = 1;
        }
    }
    useEffect(() => {
        showDate();
    }, []);
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
                        <Link
                            className={`${style.route_link} font_color_1da1f2`}
                            href={''}
                        >
                            Chọn ngày khám
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
                                            className={
                                                chonNgay.mouth_container_icon
                                            }
                                        />
                                        <p>
                                            THÁNG {month}, {year}
                                        </p>
                                        <FaCircleChevronRight
                                            className={
                                                chonNgay.mouth_container_icon
                                            }
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
                                    ></ul>
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
