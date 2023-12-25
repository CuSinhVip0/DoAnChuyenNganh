import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {hasCookie} from 'cookies-next';

import {useRef, useEffect, useState} from 'react';

import style from '@/styles/datLich/chonKhoa.module.css';

import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt} from 'react-icons/fa';

export const getServerSideProps = async ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    const posts = await fetch('http://localhost:3000/api/khoa/getAllKhoa_name');
    return {props: {hascookie, result: await posts.json()}};
};

function Page(props) {
    const khoa = useRef();
    const router = useRouter();
    const [value, setValue] = useState();
    //dieu huong sang trang tiep theo
    // const handleAddKhoa = (id) => {
    //     // sessionStorage.setItem('query_lich', JSON.stringify({id_khoa: id}));
    //     router.push({
    //         pathname: '/dat-lich/chon-ngay',
    //         query: {id_khoa: id},
    //     });
    // };
    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('/dat-lich/chon-ngay');
    }, [router]);
    // chuẩn hóa tiếng việt - trên mạng
    function normalizeString(str) {
        if (typeof str !== 'string') {
            console.error(
                'normalizeString was called with a non-string argument:',
                str,
            );
            return '';
        }
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    function search(term, data) {
        const normalizedTerm = normalizeString(term);
        return data.filter((item) =>
            normalizeString(item.ten_khoa).includes(normalizedTerm),
        );
    }
    const show = () => {
        const searchResults =
            value != undefined
                ? search(value, props.result.data)
                : props.result.data;

        return (
            <>
                {searchResults.map((item) => {
                    return (
                        <Link
                            className={`${style.result_item} ${style.result_item_link}`}
                            href={{
                                pathname: '/dat-lich/chon-ngay',
                                query: {id_khoa: item.id_khoa},
                            }}
                            shallow={true}
                            key={item.id_khoa}
                            // onClick={() => handleAddKhoa(item.id_khoa)}
                        >
                            Khoa {item.ten_khoa}
                        </Link>
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
                        <Link
                            className={`${style.route_link} cursor_non`}
                            href={''}
                        >
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
                                        onChange={(e) => {
                                            setValue(e.target.value);
                                        }}
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
                                        <ul>{show()}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
