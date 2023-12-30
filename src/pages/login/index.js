'use client';
import {useRef, useState} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import login from '@/styles/login.module.css';
import {useRouter} from 'next/router';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import Link from 'next/link';

const allError = ['oke', 'error_user', 'error_pass'];

export default function LoginPage() {
    const [error, setError] = useState(allError[0]);
    const router = useRouter();
    const username = useRef();
    const password = useRef();

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
                                value="Đăng nhập"
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
                    </div>
                    <div className={login.description}>
                        <Image
                            width="500"
                            height="500"
                            src="/register.svg"
                            alt="register_image"
                        />
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
