'use client';
import {useRef, useState, useEffect} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import login from '@/styles/login.module.css';
import {useRouter} from 'next/router';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import Link from 'next/link';
import {useSession, signIn} from 'next-auth/react';
import {FaGithub, FaGoogle} from 'react-icons/fa';

const allError = ['oke', 'error_user', 'error_pass'];

export default function LoginPage() {
    const [error, setError] = useState(allError[0]);
    const router = useRouter();
    const username = useRef();
    const password = useRef();
    const loading = useRef();
    const {data, status} = useSession();
    const [re, setRe] = useState(false);
    //new
    useEffect(() => {
        if (re || (status == 'loading' && loading.current)) {
            loading.current.style.display = 'flex';
        }
        if (re || (status == 'unauthenticated' && loading.current)) {
            loading.current.style.display = 'none';
        }
        if (data) {
            setCookie('id_nguoidung', data.user.id);
            router.push({
                pathname: sessionStorage.getItem('currentPage') || '/',
                query: JSON.parse(
                    sessionStorage.getItem('queryCurrentPage') || null,
                ),
            });
        }
    }, [status, re]);

    //end

    if (error == allError[1]) {
        username.current.innerText =
            'Thông tin tài khoản không đúng ??? Nhập lại!';
    }
    if (error == allError[2]) {
        password.current.innerText =
            'Thông tin mật khẩu không đúng ??? Nhập lại!';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRe(true);
        const username = e.target[0].value;
        const password = e.target[1].value;
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            }).then((res) => {
                return res.json();
            });

            if (response.message == 'oke') {
                // Đăng nhập thành công, có thể thực hiện các thao tác sau đăng nhập
                setCookie('id_nguoidung', response.id);
                router.push({
                    pathname: sessionStorage.getItem('currentPage') || '/',
                    query:
                        JSON.parse(
                            sessionStorage.getItem('queryCurrentPage'),
                        ) || null,
                });
                sessionStorage.removeItem('currentPage');
                sessionStorage.removeItem('queryCurrentPage');
            } else if (response.message == 'error_username') {
                // báo các trường hợp sai mật khẩu hay tài khoản
                setError(allError[1]);
            } else if (response.message == 'error_password') {
                setError(allError[2]);
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi thực hiện đăng nhập:', error);
        }
    };

    return (
        <>
            <Head>
                <title>Đăng nhập</title>
            </Head>
            <div className={login.wrapper}>
                <div className={login.container}>
                    <div className={login.form_login}>
                        <div className={login.title}>Đăng nhập</div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input
                                type="text"
                                className={login.input}
                                name="username"
                                placeholder="Tài khoản"
                                onFocus={(e) => handleFocus(e, username)}
                                onBlur={(e) => handleCheck(e.target, username)}
                            />
                            <p
                                className={login.form_notification}
                                ref={username}
                            ></p>
                            <input
                                type="password"
                                className={login.input}
                                name="password"
                                placeholder="Mật khẩu"
                                onFocus={(e) => handleFocus(e, password)}
                                onBlur={(e) => handleCheck(e.target, password)}
                            />
                            <p
                                className={login.form_notification}
                                ref={password}
                            ></p>
                            <input
                                type="submit"
                                className={
                                    login.input + ' ' + login.login_submit
                                }
                                value={'Đăng nhập'}
                            />
                        </form>
                        <div className={login.sub}>
                            <p className={login.sub_title}>
                                Bạn chưa có tài khoản?{' '}
                                <Link
                                    className={login.sub_link}
                                    href="/register"
                                >
                                    Đăng ký
                                </Link>
                            </p>
                        </div>
                        <button
                            className={login.button}
                            onClick={() => {
                                signIn('github');
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="48"
                                height="48"
                                viewBox="0 0 30 30"
                            >
                                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                            </svg>
                            Đăng nhập với Github
                        </button>
                        <button
                            className={login.button}
                            onClick={() => {
                                signIn('google');
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#fbc02d"
                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                                <path
                                    fill="#e53935"
                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                ></path>
                                <path
                                    fill="#4caf50"
                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                ></path>
                                <path
                                    fill="#1565c0"
                                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                            </svg>
                            Đăng nhập với Google
                        </button>
                    </div>
                    <div className={login.description}>
                        <Image
                            width="500"
                            height="500"
                            src="/register.svg"
                            alt="register_image"
                            priority
                        />
                    </div>
                </div>
                <div ref={loading} className="loadding_container">
                    <div
                        aria-label="Orange and tan hamster running in a metal wheel"
                        role="img"
                        className="wheel-and-hamster"
                    >
                        <div className="wheel"></div>
                        <div className="hamster">
                            <div className="hamster__body">
                                <div className="hamster__head">
                                    <div className="hamster__ear"></div>
                                    <div className="hamster__eye"></div>
                                    <div className="hamster__nose"></div>
                                </div>
                                <div className="hamster__limb hamster__limb--fr"></div>
                                <div className="hamster__limb hamster__limb--fl"></div>
                                <div className="hamster__limb hamster__limb--br"></div>
                                <div className="hamster__limb hamster__limb--bl"></div>
                                <div className="hamster__tail"></div>
                            </div>
                        </div>
                        <div className="spoke"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
function handleFocus(e, ref) {
    ref.current.innerText = '';
    e.target.className = e.target.className.replace(' unvalid', '');
}
function handleCheck(e, ref = null) {
    const value = e.value;
    //không có data
    if (!value) {
        ref.current.innerText = 'Vui lòng nhập đủ thông tin';
        return false;
    }
    //có data
    else {
        ref.current.innerText = '';
        switch (e.name) {
            //username :Kí tự đầu tiên là chữ và độ dài lớn hơn 4
            case 'username':
                if (
                    !(
                        e.value.length >= 4 &&
                        ((e.value.charCodeAt(0) >= 65 &&
                            e.value.charCodeAt(0) <= 90) ||
                            (e.value.charCodeAt(0) >= 97 &&
                                e.value.charCodeAt(0) <= 122))
                    )
                ) {
                    if (!e.className.includes('unvalid'))
                        e.className += ' unvalid';
                    ref.current.innerText =
                        'Tài khoản không hợp lệ! Vui lòng nhập lại';
                    return false;
                }
                return true;

            //password: Kí tự đầu tiên là chữ và viết hoa và độ dài lớn hơn 6
            case 'password':
                if (
                    !(
                        e.value.length >= 4 &&
                        e.value.charCodeAt(0) >= 65 &&
                        e.value.charCodeAt(0) <= 90
                    )
                ) {
                    if (!e.className.includes('unvalid'))
                        e.className += ' unvalid';
                    ref.current.innerText =
                        'Mật khẩu không hợp lệ! Vui lòng nhập lại';
                    return false;
                }
                return true;

            default:
                return false;
        }
    }
}
