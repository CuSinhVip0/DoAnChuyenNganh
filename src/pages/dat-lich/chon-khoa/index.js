import Nav from '@/component/nav';
import Head from 'next/head';
import Link from 'next/link';

import style from '@/styles/datLich/chonKhoa.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt} from 'react-icons/fa';
import {AiOutlineRollback} from 'react-icons/ai';
import {useRef} from 'react';
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';

export const getServerSideProps = ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
};

function Page(props) {
    const router = useRouter();
    const khoa = useRef();
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
                        <Link
                            className={`${style.route_link} font_color_1da1f2`}
                            href={''}
                        >
                            Chọn chuyên khoa
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
                                <div
                                    className={` ${style.title} text_align_center`}
                                >
                                    Chọn chuyên khoa
                                </div>
                                <div className={style.right_body}>
                                    <input
                                        className={`${style.search_input} font_color_858585`}
                                        type="text"
                                        placeholder="Tìm kiếm nhanh chuyên khoa"
                                    />

                                    <div
                                        className={style.right_body_result}
                                        ref={khoa}
                                        onWheel={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <ul>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                            <li className={style.result_item}>
                                                Khám chức năng hô hấp
                                            </li>
                                        </ul>
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
