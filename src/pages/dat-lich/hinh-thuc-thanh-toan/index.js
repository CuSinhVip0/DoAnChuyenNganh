import Head from 'next/head';
import {getCookie} from 'cookies-next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';

import {useState, useRef, useEffect} from 'react';

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
import {FaBriefcaseMedical} from 'react-icons/fa';
import {FiPhone} from 'react-icons/fi';
import {MdKeyboardArrowRight} from 'react-icons/md';

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

// test

const DynamicHeader = dynamic((dataCountry, data) => import('@/component/a'), {
    ssr: false,
    loading: () => (
        <>
            <li className={`  ${style.skeleton}`}></li>
            <li className={`  ${style.skeleton}`}></li>
            <li className={`  ${style.skeleton}`}></li>
        </>
    ),
});

function Page(props) {
    const loader = useRef();
    const btn_text = useRef();
    const [paymentMethod, setPaymentMethod] = useState();
    const [data, setData] = useState();
    const router = useRouter();
    const btnref = useRef();

    useEffect(() => {
        if (props.hascookie.result.length == 0) {
            if (!sessionStorage.getItem('currentPage')) {
                sessionStorage.setItem('currentPage', router.asPath);
            }
            router.push('/login');
        }
    }, [props.hascookie.result]);
    const infor = async () => {
        const x = await fetch(
            `http://localhost:3000/api/users/lichKham/getPhieuKham?id=${router.query.id}`,
        ).then((response) => {
            return response.json();
        });
        setData(x.result[0]);
    };
    useEffect(() => {
        infor();
    }, []);
    console.log(data);

    async function handlePayment(id) {
        const result = await fetch(
            'http://localhost:3000/api/users/lichKham/updateSTT',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: id,
                }),
            },
        ).then((response) => {
            return response.json();
        });
        if (result) {
            router.push({
                pathname: '/chi-tiet-phieu-kham-benh',
                query: {id: id},
            });
        }
    }
    return (
        props.hascookie.result && (
            <>
                <Head>
                    <title>
                        Chọn hình thức thanh toán - Đặt lịch khám bệnh
                    </title>
                </Head>
                {props.hascookie && data && (
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
                                                <li
                                                    className={
                                                        style.left_body_item
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            style.item_icon
                                                        }
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
                                                            180 Cao Lỗ, Phường
                                                            4, Quận 8, TP. Hồ
                                                            Chí Minh
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <DynamicHeader
                                        dataCountry={dataCountry}
                                        data={data}
                                    />
                                </div>

                                {/* right */}
                                <div className={style.right}>
                                    <div className={style.right_container}>
                                        <div className={style.title}>
                                            Hình thức thanh toán
                                        </div>
                                        <div className={style.right_body}>
                                            <div
                                                className={thanhtoan.container}
                                            >
                                                <div className={thanhtoan.left}>
                                                    <div
                                                        className={
                                                            thanhtoan.left_item
                                                        }
                                                    >
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="thanhtoan"
                                                                onClick={() => {
                                                                    setPaymentMethod(
                                                                        0,
                                                                    );
                                                                }}
                                                            />
                                                            Thanh toán bằng momo
                                                        </label>
                                                    </div>
                                                    <div
                                                        className={
                                                            thanhtoan.left_item
                                                        }
                                                    >
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="thanhtoan"
                                                                onClick={() => {
                                                                    setPaymentMethod(
                                                                        1,
                                                                    );
                                                                }}
                                                            />
                                                            Thanh toán bằng QR
                                                            Code / Mobile
                                                            banking
                                                        </label>
                                                    </div>
                                                    <div
                                                        className={
                                                            thanhtoan.left_item
                                                        }
                                                    >
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="thanhtoan"
                                                                onClick={() => {
                                                                    setPaymentMethod(
                                                                        2,
                                                                    );
                                                                }}
                                                            />
                                                            Skip Payment
                                                        </label>
                                                    </div>
                                                </div>
                                                <div
                                                    className={thanhtoan.right}
                                                >
                                                    <div
                                                        className={
                                                            thanhtoan.right_title
                                                        }
                                                    >
                                                        <FaRegCreditCard className="mr_4" />
                                                        Thông tin thanh toán
                                                    </div>
                                                    <div
                                                        className={
                                                            thanhtoan.right_body
                                                        }
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
                                                                    Khám{' '}
                                                                    {
                                                                        data.ten_khoa
                                                                    }
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
                                                                    {format_date(
                                                                        data.ngay_kham,
                                                                    )}
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
                                                                    {
                                                                        data.gio_kham
                                                                    }
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

                                    <div
                                        className={style.right_container_down}
                                        style={{justifyContent: 'flex-end'}}
                                    >
                                        <button
                                            disabled={
                                                paymentMethod == undefined
                                            }
                                            ref={btnref}
                                            className={`${
                                                style.right_button_right
                                            } ${
                                                paymentMethod == undefined &&
                                                thanhtoan.btndisabled
                                            }`}
                                            onClick={() => {
                                                if (paymentMethod == 0) {
                                                    router.replace(
                                                        'https://momo.vn/',
                                                    );
                                                } else if (paymentMethod == 1) {
                                                    router.replace(
                                                        'https://vnpay.vn/',
                                                    );
                                                } else if (paymentMethod == 2) {
                                                    btnref.current.disabled = true;
                                                    btnref.current &&
                                                        (btnref.current.style.cursor =
                                                            'no-drop');
                                                    btnref.current &&
                                                        (btnref.current.style.background =
                                                            '#e8e8e8');
                                                    btn_text.current &&
                                                        (btn_text.current.style.display =
                                                            'none');
                                                    loader.current &&
                                                        (loader.current.style.display =
                                                            'flex');
                                                    handlePayment(
                                                        router.query.id,
                                                    );
                                                }
                                            }}
                                        >
                                            <div ref={btn_text}>Thanh toán</div>
                                            <div
                                                ref={loader}
                                                className="loader"
                                            >
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
                    </div>
                )}
            </>
        )
    );
}

export default Page;
