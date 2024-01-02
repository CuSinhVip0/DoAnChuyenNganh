import Head from 'next/head';
import Link from 'next/link';
import {getCookie} from 'cookies-next';
import {useRouter} from 'next/router';
import Image from 'next/image';

import doctor from '../../../public/doctor.jpg';

import {useState, useEffect} from 'react';

import Layout from '@/styles/layout/layout.module.css';
import Search from '@/styles/search.module.css';

import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaRegCircleXmark} from 'react-icons/fa6';

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

function Page() {
    const router = useRouter();

    const [valueSearch, setValueSearch] = useState(useRouter().query.q);
    const [value, setValue] = useState();
    const result = async () => {
        const res = await fetch('/api/search?q=' + valueSearch);
        const data = await res.json();
        setValue(data);
    };
    useEffect(() => {
        result();
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            result();
        }, 1000);
        return () => clearTimeout(delay);
    }, [valueSearch]);
    useEffect(() => {
        router.replace({query: {q: valueSearch}});
    }, [valueSearch]);

    return (
        <>
            <Head>
                <title>Search</title>
            </Head>
            <div className={Search.wrapper}>
                <div className={Search.container}>
                    <div className={Search.header}>
                        <div className={Layout.route}>
                            <Link className={Layout.route_link} href={'/'}>
                                Trang chủ
                            </Link>
                            <MdKeyboardArrowRight className="mlr_4px" />
                            <Link
                                className={`${Layout.route_link} font_color_1da1f2`}
                                href={''}
                            >
                                Tìm kiếm
                            </Link>
                        </div>
                        <div className={Search.title}>Kết quả tìm kiếm </div>
                        <div
                            style={{display: 'flex', justifyContent: 'center'}}
                        >
                            <div className={Search.input}>
                                <input
                                    type="text"
                                    value={valueSearch ? valueSearch : ''}
                                    className={Search.up_search}
                                    placeholder="Search"
                                    onChange={(e) => {
                                        setValueSearch(e.target.value);
                                    }}
                                />
                                {valueSearch && (
                                    <FaRegCircleXmark
                                        className={Search.up_search_icon}
                                        onClick={() => setValueSearch('')}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Layout.container}>
                    <div className={Search.items}>
                        <div className={Search.item}>
                            <div className={Search.item_title}>
                                <div className={Search.item_title_left}>
                                    Bác sĩ
                                </div>
                                {value && value.bacsi != 'none' && (
                                    <div className={Search.item_title_right}>
                                        Xem tất cả
                                    </div>
                                )}
                            </div>
                            <div>
                                <ul className={Search.item_content}>
                                    {value &&
                                        (value.bacsi == 'none' ? (
                                            <div>
                                                Không tìm được thông tin liên
                                                quan
                                            </div>
                                        ) : (
                                            value.bacsi.map((item, index) => {
                                                if (index > 2) return;
                                                return (
                                                    <li
                                                        key={item.id_nvyt}
                                                        className={Search.user}
                                                    >
                                                        <div
                                                            className={
                                                                Search.user_img
                                                            }
                                                        >
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                                src={doctor}
                                                                alt={'abc'}
                                                            />
                                                        </div>
                                                        <div
                                                            className={
                                                                Search.user_about
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    Search.about_name
                                                                }
                                                            >
                                                                {item.ten}
                                                            </div>
                                                            <div
                                                                className={
                                                                    Search.age
                                                                }
                                                            >
                                                                {item.ten}
                                                            </div>
                                                            <div>
                                                                <div
                                                                    className={`${Search.about_specialist} linear_00b5f1_00e0ff_36`}
                                                                >
                                                                    {
                                                                        item.ten_khoa
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className={Search.item}>
                            <div className={Search.item_title}>
                                <div className={Search.item_title_left}>
                                    Chuyên khoa
                                </div>
                            </div>
                            <div>
                                <ul className={Search.item_content}>
                                    {value &&
                                        (value.khoa == 'none' ? (
                                            <div>
                                                Không tìm được thông tin liên
                                                quan
                                            </div>
                                        ) : (
                                            value.khoa.map((item) => (
                                                <li
                                                    key={item.id_khoa}
                                                    className={Search.depart}
                                                >
                                                    <div
                                                        className={
                                                            Search.depart_about
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                Search.depart_about_name
                                                            }
                                                        >
                                                            {item.ten_khoa}
                                                        </div>
                                                        <div
                                                            className={
                                                                Search.depart_about_des
                                                            }
                                                        >
                                                            {
                                                                item.thong_tin_chi_tiet
                                                            }
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            Search.depart_button
                                                        }
                                                    >
                                                        <Link
                                                            href={{
                                                                pathname:
                                                                    '/dat-lich/chon-ngay',
                                                                query: {
                                                                    id_khoa:
                                                                        item.id_khoa,
                                                                },
                                                            }}
                                                            className={`${Search.depart_button_up}`}
                                                        >
                                                            Đặt khám với chuyên
                                                            khoa
                                                        </Link>
                                                        <div
                                                            className={`${Search.depart_button_below} `}
                                                        >
                                                            Xem chi tiết
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
