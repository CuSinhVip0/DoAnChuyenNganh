import {getCookie} from 'cookies-next';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';

import {useState, useRef, useEffect, useLayoutEffect} from 'react';

import layout from '@/styles/layout/layout.module.css';
import chitiet from '@/styles/chitiet.module.css';

import {MdKeyboardArrowRight} from 'react-icons/md';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolderOpen} from '@fortawesome/free-regular-svg-icons';

import {format_date} from '@/functions/xoa_dau';

export async function getServerSideProps({req, res}) {
    const hascookie = await fetch(
        `http://localhost:3000/api/users/getDataUser?id=${getCookie(
            'id_nguoidung',
            {req, res},
        )}`,
    );
    return {
        props: {hascookie: await hascookie.json()},
    };
}

function Page(props) {
    const router = useRouter();
    const [data, setData] = useState();

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

    return (
        props.hascookie.result && (
            <>
                <Head>
                    <title>Chi tiết phiếu khám bệnh - MedConnect</title>
                </Head>
                <div className={layout.wrapper}>
                    <div className={layout.container}>
                        <div className={layout.route}>
                            <Link className={layout.route_link} href={'/'}>
                                Trang chủ
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link
                                className={`${layout.route_link} font_color_1da1f2`}
                                href={''}
                            >
                                Thông tin phiếu khám bệnh
                            </Link>
                        </div>
                        <div
                            className={chitiet.button}
                            onClick={() =>
                                router.push('/profile?tab=phieukhambenh')
                            }
                        >
                            <FontAwesomeIcon
                                color="#00b5f1"
                                icon={faFolderOpen}
                            />
                            Danh sách phiếu khám
                        </div>
                        {data && (
                            <div className={layout.content}>
                                <div className={chitiet.container}>
                                    <div className={chitiet.container_item}>
                                        <div className={chitiet.item}>
                                            <p className={chitiet.item_title}>
                                                PHIẾU KHÁM BỆNH
                                            </p>
                                            <p className={chitiet.item_subname}>
                                                Bệnh viện Đại học Y Dược TP.HCM
                                            </p>
                                            <p className={chitiet.item_adress}>
                                                Cơ sở 201 Nguyễn Chí Thanh,
                                                Phường 12, Quận 5, TP. Hồ Chí
                                                Minh
                                            </p>
                                            <p
                                                className={
                                                    chitiet.item_titleCode
                                                }
                                            >
                                                Mã phiếu
                                            </p>
                                            <p className={chitiet.item_code}>
                                                {data.id_phieuKham}
                                            </p>
                                            <div
                                                className={
                                                    chitiet.item_containerCheck
                                                }
                                            >
                                                <p
                                                    className={
                                                        chitiet.item_check
                                                    }
                                                >
                                                    Đã thanh toán
                                                </p>
                                            </div>
                                        </div>
                                        <div className={chitiet.item}>
                                            <p className={chitiet.item_textNum}>
                                                Số thứ tự tiếp nhận
                                            </p>
                                            <p className={chitiet.item_number}>
                                                {data.sott}
                                            </p>
                                            <div className={chitiet.item_item}>
                                                <div
                                                    className={
                                                        chitiet.item_left
                                                    }
                                                >
                                                    Mã phiếu:
                                                </div>
                                                <div
                                                    className={
                                                        chitiet.item_right
                                                    }
                                                >
                                                    {data.id_phieuKham}
                                                </div>
                                            </div>
                                            <div className={chitiet.item_item}>
                                                <div
                                                    className={
                                                        chitiet.item_left
                                                    }
                                                >
                                                    Chuyên khoa:
                                                </div>
                                                <div
                                                    className={`${chitiet.item_right} textUppercase`}
                                                >
                                                    {data.ten_khoa}
                                                </div>
                                            </div>
                                            <div className={chitiet.item_item}>
                                                <div
                                                    className={
                                                        chitiet.item_left
                                                    }
                                                >
                                                    Ngày khám:
                                                </div>
                                                <div
                                                    className={`${chitiet.item_right} font_color-1abc9c`}
                                                >
                                                    {format_date(
                                                        data.ngay_kham,
                                                    )}
                                                </div>
                                            </div>
                                            <div className={chitiet.item_item}>
                                                <div
                                                    className={
                                                        chitiet.item_left
                                                    }
                                                >
                                                    Giờ khám dự kiến:
                                                </div>
                                                <div
                                                    className={`${chitiet.item_right} font_color-1abc9c`}
                                                >
                                                    {data.gio_kham}
                                                </div>
                                            </div>
                                            <div className={chitiet.item_item}>
                                                <div
                                                    className={
                                                        chitiet.item_left
                                                    }
                                                >
                                                    Phí khám:
                                                </div>
                                                <div
                                                    className={
                                                        chitiet.item_right
                                                    }
                                                >
                                                    100.000 VND
                                                </div>
                                            </div>
                                        </div>
                                        <div className={chitiet.item}>
                                            <div className={chitiet.item_item}>
                                                <div
                                                    className={
                                                        chitiet.item_left
                                                    }
                                                >
                                                    Bệnh nhân:
                                                </div>
                                                <div
                                                    className={`${chitiet.item_right} textUppercase`}
                                                >
                                                    {data.ten}
                                                </div>
                                            </div>{' '}
                                            <div className={chitiet.item_item}>
                                                <div
                                                    className={
                                                        chitiet.item_left
                                                    }
                                                >
                                                    Ngày sinh:
                                                </div>
                                                <div
                                                    className={
                                                        chitiet.item_right
                                                    }
                                                >
                                                    {data.ngay_sinh
                                                        .split('T')[0]
                                                        .split('-')
                                                        .reverse()
                                                        .join('/')}
                                                </div>
                                            </div>
                                            <div className={chitiet.item_item}>
                                                <div
                                                    className={
                                                        chitiet.item_left
                                                    }
                                                >
                                                    Mã bệnh nhân:
                                                </div>
                                                <div
                                                    className={
                                                        chitiet.item_right
                                                    }
                                                >
                                                    {data.id_nguoiBenh}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={chitiet.item}>
                                            <p className={chitiet.attention}>
                                                Lưu ý:
                                            </p>
                                            <p className={chitiet.note}>
                                                <span style={{fontWeight: 700}}>
                                                    Hướng dẫn để được tiếp nhận
                                                    khám :
                                                </span>
                                            </p>
                                            <p className={chitiet.note}>
                                                -{' '}
                                                <span style={{fontWeight: 700}}>
                                                    Người bệnh đặt khám lần đầu
                                                    trên phần mềm:
                                                </span>
                                                Đến phòng khám 116 ở tầng trệt
                                                cổng chính bệnh viện (Cổng số 1)
                                                để xác nhận thông tin bệnh nhân.
                                            </p>
                                            <p className={chitiet.note}>
                                                -{' '}
                                                <span style={{fontWeight: 700}}>
                                                    Người bệnh đã từng đặt khám
                                                    trên phần mềm:
                                                </span>
                                                Đến trực tiếp phòng khám theo
                                                giờ hẹn đã đăng ký, xuất trình
                                                phiếu khám điện tử để khám bệnh.
                                            </p>
                                            <p className={chitiet.note}>
                                                <span style={{fontWeight: 700}}>
                                                    Lưu ý:
                                                </span>
                                            </p>
                                            <p className={chitiet.note}>
                                                - Mọi vấn đề phát sinh cần hỗ
                                                trợ, vui lòng liên hệ Hotline{' '}
                                                <span style={{fontWeight: 700}}>
                                                    1900JQKA
                                                </span>{' '}
                                                để được xử lý nhanh.
                                            </p>
                                            <p className={chitiet.note}>
                                                - Phiếu khám bệnh chỉ có giá trị
                                                trong ngày khám từ 07:00 -
                                                17:30.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    );
}

export default Page;
