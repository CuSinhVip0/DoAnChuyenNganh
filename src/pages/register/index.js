import Head from "next/head";
import Image from "next/image";
import register from "@/styles/register.module.css";
import { useRef, useState } from "react";

export default function Page({ repo }) {
    const username = useRef();
    const password = useRef();
    const password_confirm = useRef();

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <div className={register.wrapper}>
                <div className={register.container}>
                    <div className={register.form_register}>
                        <div className={register.title}>Đăng ký</div>
                        <form method="post" onSubmit={(e) => handleSubmit(e)} action="http://localhost:3000/api/register">
                            <input
                                type="text"
                                className={register.input}
                                onBlur={(e) => {
                                    handleCheck(e.target, username);
                                }}
                                onFocus={(e) => {
                                    handleFocus(e, username);
                                }}
                                name="username"
                                placeholder="Tài khoản"
                            />
                            <p
                                className={register.form_notification}
                                ref={username}
                            ></p>

                            <input
                                type="password"
                                className={register.input}
                                name="password"
                                placeholder="Mật khẩu"
                                onBlur={(e) => {
                                    handleCheck(e.target, password);
                                }}
                                onFocus={(e) => {
                                    handleFocus(e, password);
                                }}
                            />
                            <p
                                className={register.form_notification}
                                ref={password}
                            ></p>
                            <input
                                type="password"
                                className={register.input}
                                name="password_confirm"
                                placeholder="Xác nhập mật khẩu"
                                onBlur={(e) => {
                                    handleCheck(e.target, password_confirm);
                                }}
                                onFocus={(e) => {
                                    handleFocus(e, password_confirm);
                                }}
                            />
                            <p
                                className={register.form_notification}
                                ref={password_confirm}
                            ></p>
                            <input
                                type="submit"
                                className={
                                    register.input +
                                    " " +
                                    register.register_submit
                                }
                                value="Đăng ký"
                            />
                        </form>
                        <div className={register.sub}>
                            <p className={register.sub_title}>
                                Bạn đã có tài khoản?{" "}
                                <a className={register.sub_link} href="/login">
                                    Đăng nhập
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className={register.description}>
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

    function handleFocus(e, ref) {
        ref.current.innerText = "";
        e.target.className = e.target.className.replace(" unvalid", "");
    }

    function handleCheck(e, ref = null) {
        const value = e.value;
        //không có data
        if (!value) {
            ref.current.innerText = "Vui lòng nhập đủ thông tin";
            return false;
        }

        //có data
        else {
            ref.current.innerText = "";
            switch (e.name) {
                //username :Kí tự đầu tiên là chữ và độ dài lớn hơn 4
                case "username":
                    if (
                        !(
                            e.value.length >= 4 &&
                            ((e.value.charCodeAt(0) >= 65 &&
                                e.value.charCodeAt(0) <= 90) ||
                                (e.value.charCodeAt(0) >= 97 &&
                                    e.value.charCodeAt(0) <= 122))
                        )
                    ) {
                        if (!e.className.includes("unvalid"))
                            e.className += " unvalid";
                        ref.current.innerText =
                            "Tài khoản không hợp lệ! Vui lòng nhập lại";
                        return false;
                    }
                    return true;

                //password: Kí tự đầu tiên là chữ và viết hoa và độ dài lớn hơn 6
                case "password":
                    const pass = document.getElementsByName("password_confirm");
                    //check lại ô password confirm
                    if (pass[0].value) {
                        if (e.value !== pass[0].value) {
                            if (!pass[0].className.includes("unvalid"))
                                pass[0].className += " unvalid";
                            password_confirm.current.innerText =
                                "Mật này không hợp lệ! Vui này nhập lai";
                            return false;
                        }
                    }

                    if (
                        !(
                            e.value.length >= 4 &&
                            e.value.charCodeAt(0) >= 65 &&
                            e.value.charCodeAt(0) <= 90
                        )
                    ) {
                        if (!e.className.includes("unvalid"))
                            e.className += " unvalid";
                        ref.current.innerText =
                            "Mật khẩu không hợp lệ! Vui lòng nhập lại";
                        return false;
                    }
                    return true;
                case "password_confirm":
                    const password = document.getElementsByName("password");
                    if (e.value !== password[0].value) {
                        if (!e.className.includes("unvalid"))
                            e.className += " unvalid";
                        ref.current.innerText =
                            "Mật khẩu không giống nhau! Vui lòng nhập lại";
                        return false;
                    }
                    return true;

                default:
                    return false;
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        var x = true;

        //check trước khi gửi
        !handleCheck(e.target[0], username) && (x = false);

        !handleCheck(e.target[1], password) && (x = false);

        !handleCheck(e.target[2], password_confirm) && (x = false);
        console.log(x);
        if (x) {
            e.target.submit();
        }
    }
}
