// pages/login.js
import { useRef, useState } from "react";
import Head from "next/head";
import loginStyles from "@/styles/login.module.css";

export default function LoginPage() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Đăng nhập thành công, có thể thực hiện các thao tác sau đăng nhập
        console.log("Đăng nhập thành công!");
      } else {
        const errorData = await response.json();
        console.error("Đăng nhập thất bại:", errorData.error);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi thực hiện đăng nhập:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className={loginStyles.wrapper}>
        <div className={loginStyles.container}>
          <div className={loginStyles.form_login}>
            <div className={loginStyles.title}>Đăng nhập</div>
            <form method="post" onSubmit={handleSubmit}>
              <input
                type="text"
                className={loginStyles.input}
                name="username"
                placeholder="Tài khoản"
                ref={usernameRef}
              />
              <input
                type="password"
                className={loginStyles.input}
                name="password"
                placeholder="Mật khẩu"
                ref={passwordRef}
              />
              <input
                type="submit"
                className={loginStyles.input + " " + loginStyles.login_submit}
                value="Đăng nhập"
              />
            </form>
            <div className={loginStyles.sub}>
              <p className={loginStyles.sub_title}>
                Bạn chưa có tài khoản?{" "}
                <a className={loginStyles.sub_link} href="/register">
                  Đăng ký
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
