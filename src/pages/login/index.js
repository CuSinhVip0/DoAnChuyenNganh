import { useRef, useState } from "react";
import Head from "next/head";
import login from "@/pages/styles/login.module.css";

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
      <div className={login.wrapper}>
        <div className={login.container}>
          <div className={login.form_login}>
            <div className={login.title}>Đăng nhập</div>
            <form method="post" onSubmit={handleSubmit}>
              <input
                type="text"
                className={login.input}
                name="username"
                placeholder="Tài khoản"
                ref={usernameRef}
              />
              <input
                type="password"
                className={login.input}
                name="password"
                placeholder="Mật khẩu"
                ref={passwordRef}
              />
              <input
                type="submit"
                className={login.input + " " + login.login_submit}
                value="Đăng nhập"
              />
            </form>
            <div className={login.sub}>
              <p className={login.sub_title}>
                Bạn chưa có tài khoản?{" "}
                <a className={login.sub_link} href="/register">
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
