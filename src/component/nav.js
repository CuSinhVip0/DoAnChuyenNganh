import Link from 'next/link';
import Image from 'next/image';
import {useRef, useEffect, useState} from 'react';
import nav from '@/styles/nav/index.module.css';
import logo from '../../public/image/logo2.png';
import user from '../../public/user.svg';

import {FaRegCircleXmark} from 'react-icons/fa6';
import {FaCaretDown} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {MdOutlineSearch} from 'react-icons/md';

import {deleteCookie} from 'cookies-next';
import {useRouter} from 'next/router';

export default function Nav({hascookie}) {
    const container = useRef();
    const left = useRef();
    const router = useRouter();
    const [valueSearch, setValueSearch] = useState();
    const handleLogout = () => {
        // Xóa cookie 'id_nguoidung'
        deleteCookie('id_nguoidung');
        router.replace(router.asPath);
    };

    useEffect(() => {
        //xử lý sự kiện khi lăn chuột của navbar
        window.addEventListener('wheel', function (event) {
            if (event.deltaY < 0) {
                if (container.current != null) {
                    if (container.current.classList.contains('scrollup')) {
                        container.current.className =
                            container.current.className.replace(
                                ' scrollup',
                                '',
                            );
                    }
                    if (container.current.classList.contains('scrolldown')) {
                        return;
                    }
                    if (left.current.classList.contains('translateY_25')) {
                        left.current.className = left.current.className.replace(
                            ' translateY_25',
                            '',
                        );
                    }
                    if (left.current.classList.contains('translateY_0')) {
                        return;
                    }

                    left.current.className += ' translateY_0';
                    container.current.className += ' scrolldown';
                }
            } else if (event.deltaY > 0) {
                if (container.current != null) {
                    if (container.current.classList.contains('scrolldown')) {
                        container.current.className =
                            container.current.className.replace(
                                ' scrolldown',
                                '',
                            );
                    }
                    if (container.current.classList.contains('scrollup')) {
                        return;
                    }
                    if (left.current.classList.contains('translateY_0')) {
                        left.current.className = left.current.className.replace(
                            ' translateY_0',
                            '',
                        );
                    }
                    if (left.current.classList.contains('translateY_25')) {
                        return;
                    }

                    left.current.className += ' translateY_25';
                    container.current.className += ' scrollup';
                }
            }
        });
        return () => window.removeEventListener('wheel', function (e) {});
    }, []);
    return (
        <div className={nav.container} ref={container}>
            <div className={nav.body}>
                <div className={nav.left} ref={left}>
                    <Link href={'/'}>
                        <Image
                            priority={true}
                            className={nav.left_img}
                            src={logo}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className={nav.right}>
                    <div
                        className={`${nav.up} ${
                            router.pathname == '/search' ||
                            router.pathname == '/'
                                ? 'flex-end'
                                : ''
                        }`}
                    >
                        {router.pathname !== '/search' &&
                            router.pathname !== '/' && (
                                <div style={{position: 'relative'}}>
                                    <input
                                        type="text"
                                        value={valueSearch ? valueSearch : ''}
                                        className={nav.up_search}
                                        placeholder="Search"
                                        onChange={(e) => {
                                            setValueSearch(e.target.value);
                                        }}
                                    />
                                    {valueSearch && (
                                        <FaRegCircleXmark
                                            className={nav.up_search_icon}
                                            onClick={() => setValueSearch('')}
                                        />
                                    )}
                                    <button
                                        disabled={!valueSearch}
                                        onClick={() => {
                                            router.replace({
                                                pathname: '/search',
                                                query: {q: valueSearch},
                                            });
                                        }}
                                        className={`${nav.up_search_btn}  ${
                                            !valueSearch && 'background_eee'
                                        }`}
                                    >
                                        <MdOutlineSearch
                                            className={nav.up_search_icon}
                                        />
                                    </button>
                                </div>
                            )}

                        <ul className={nav.up_items}>
                            {!hascookie ? (
                                <>
                                    <li
                                        className={[nav.up_item, 'ptb_12'].join(
                                            ' ',
                                        )}
                                    >
                                        <Link
                                            className={nav.up_register}
                                            href="/register"
                                            onClick={() => {
                                                sessionStorage.setItem(
                                                    'currentPage',
                                                    router.pathname,
                                                );
                                            }}
                                        >
                                            Register
                                        </Link>
                                    </li>
                                    <li
                                        className={[nav.up_item, 'ptb_12'].join(
                                            ' ',
                                        )}
                                    >
                                        <Link
                                            className={nav.up_login}
                                            href="/login"
                                            onClick={() => {
                                                sessionStorage.setItem(
                                                    'currentPage',
                                                    router.pathname,
                                                );
                                                sessionStorage.setItem(
                                                    'queryCurrentPage',
                                                    JSON.stringify(
                                                        router.query,
                                                    ),
                                                );
                                            }}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li
                                    className={`${nav.up_item} ${nav.up_avatar}`}
                                >
                                    <Image
                                        className={nav.up_item_img}
                                        src={user}
                                        alt="user"
                                    />
                                    {/* subnav */}
                                    <div
                                        className={`${nav.sub} ${nav.sub_avatar}`}
                                    >
                                        <ul className={nav.sub_items}>
                                            <li className={nav.sub_item}>
                                                <button
                                                    onClick={handleLogout}
                                                    className={
                                                        nav.sub_item_button
                                                    }
                                                >
                                                    <FiLogOut
                                                        className={
                                                            nav.sub_item_icon
                                                        }
                                                    />{' '}
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    {/*end subnav */}
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={nav.down}>
                        <ul className={nav.down_items}>
                            <li className={nav.down_item}>
                                <Link
                                    className={nav.down_item_link}
                                    href="/co-so-y-te"
                                >
                                    Cơ sở y tế
                                </Link>
                            </li>
                            <li className={nav.down_item}>
                                <Link
                                    className={nav.down_item_link}
                                    href="/khoa"
                                >
                                    Khoa <FaCaretDown className="ml_4" />
                                </Link>
                                {/* subnav */}
                                <div className={`${nav.sub} ${nav.sub_menu}`}>
                                    <ul className={nav.sub_items}>
                                        <li className={nav.sub_item}>
                                            <Link
                                                href={'/tim'}
                                                className={nav.sub_item_link}
                                            >
                                                Tim
                                            </Link>
                                        </li>
                                        <li className={nav.sub_item}>
                                            <Link
                                                href={'/than-kinh'}
                                                className={nav.sub_item_link}
                                            >
                                                Thần kinh
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                {/*end subnav */}
                            </li>
                            <li className={nav.down_item}>
                                <Link
                                    className={nav.down_item_link}
                                    href="/huong-dan"
                                >
                                    Hướng dẫn <FaCaretDown className="ml_4" />
                                </Link>
                                {/* subnav */}
                                <div className={`${nav.sub} ${nav.sub_menu}`}>
                                    <ul className={nav.sub_items}>
                                        <li className={nav.sub_item}>
                                            <Link
                                                href={'/tim'}
                                                className={nav.sub_item_link}
                                            >
                                                Quy trình đặt lịch khám
                                            </Link>
                                        </li>
                                        <li className={nav.sub_item}>
                                            <Link
                                                href={'/than-kinh'}
                                                className={nav.sub_item_link}
                                            >
                                                Chỉnh sửa hồ sơ bệnh nhân
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                {/*end subnav */}
                            </li>
                            <li className={nav.down_item}>
                                <Link
                                    className={nav.down_item_link}
                                    href="/tin-tuc"
                                >
                                    Tin tức{' '}
                                    <FaCaretDown
                                        className={[
                                            nav.down_item_icon,
                                            'ml-4',
                                        ].join(' ')}
                                    />
                                </Link>
                                {/* subnav */}
                                <div className={`${nav.sub} ${nav.sub_menu}`}>
                                    <ul className={nav.sub_items}>
                                        <li className={nav.sub_item}>
                                            <Link
                                                href={'/tim'}
                                                className={nav.sub_item_link}
                                            >
                                                Tin dịch vụ
                                            </Link>
                                        </li>
                                        <li className={nav.sub_item}>
                                            <Link
                                                href={'/than-kinh'}
                                                className={nav.sub_item_link}
                                            >
                                                Tin y tế
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                {/*end subnav */}
                            </li>
                            <li className={nav.down_item}>
                                <Link
                                    className={nav.down_item_link}
                                    href="/about-us"
                                >
                                    Về chúng tôi
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
