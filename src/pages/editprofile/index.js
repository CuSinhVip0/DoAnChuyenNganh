// import React from 'react';
import UpdateInfo from '@/component/updateinfor';
import Head from 'next/head';
import Link from 'next/link';

import style from '@/styles/editprofile/index.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {useRef, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {hasCookie, getCookie} from 'cookies-next';

export const getServerSideProps = async ({req, res}) => {
    const hascookie = await fetch(
        `http://localhost:3000/api/users/getDataUser?id=${getCookie(
            'id_nguoidung',
            {req, res},
        )}`,
    );
    return {props: {hascookie: await hascookie.json()}};
};

function Page(props) {
    const btn = useRef();
    const btn_text = useRef();
    const loader = useRef();
    const id = useRouter();
    const router = useRouter();
    const [user, setValue] = useState();
    const noti = useRef();
    const form = useRef();
    useEffect(() => {
        const x = async () => {
            const response = await fetch(
                `http://localhost:3000/api/users/getDataPatient?id=${id.query.id}`,
            ).then((res) => {
                return res.json();
            });
            setValue(response);
        };
        x();
    }, []);
    useEffect(() => {
        if (props.hascookie.result.length == 0) {
            router.push('/');
        }
    }, [props.hascookie.result]);

    const handelSubmitForm = async () => {
        const profile = {
            id: router.query.id,
            ten: form.current[0].value,
            ngay: form.current[1].value,
            mail: form.current[4].value,
            gioitinh: form.current[3].value,
            sdt: form.current[2].value,
            tinh: form.current[5].value,
            huyen: form.current[6].value,
            xa: form.current[7].value,
            nha: form.current[8].value,
        };

        try {
            const response = await fetch(
                'http://localhost:3000/api/users/updateInfor',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profile),
                },
            ).then((res) => {
                return res.json();
            });
            if (response) {
                noti.current.style.animation = 'a 3s ease-in-out';
            }
        } catch (error) {
            console.log(error);
        }
    };
    noti.current &&
        (noti.current.onanimationend = () => {
            router.push(
                sessionStorage.getItem('curentpage2') || '/profile?tab=hoso',
            );
            sessionStorage.removeItem('curentpage2');
        });
    return (
        props.hascookie.result && (
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
                                className={`${style.route_link} font_color_1da1f2`}
                                href={''}
                            >
                                Cập nhật thông tin
                            </Link>
                        </div>

                        <div className={style.content}>
                            <div className={style.form_content}>
                                <h2>Cập nhật thông tin</h2>
                                <p>
                                    Vui lòng cung cấp thông tin chính xác để
                                    được phục vụ tốt nhất. Trong trường hợp cung
                                    cấp sai thông tin bệnh nhân & điện thoại,
                                    việc xác nhận cuộc hẹn sẽ không hiệu lực
                                    trước khi đặt khám.
                                </p>
                            </div>
                            <UpdateInfo ref_form={form} user={user} />{' '}
                            <div className={style.right_container_down}>
                                <button
                                    ref={btn}
                                    className={style.right_button_right}
                                    onClick={() => {
                                        btn.current.disabled = true;
                                        btn.current &&
                                            (btn.current.style.cursor =
                                                'no-drop');
                                        btn.current &&
                                            (btn.current.style.background =
                                                '#e8e8e8');
                                        btn_text.current &&
                                            (btn_text.current.style.display =
                                                'none');
                                        loader.current &&
                                            (loader.current.style.display =
                                                'flex');
                                        handelSubmitForm();
                                    }}
                                >
                                    <div ref={btn_text}>Xác nhận</div>
                                    <div ref={loader} className="loader">
                                        <div className="box-load1"></div>
                                        <div className="box-load2"></div>
                                        <div className="box-load3"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>{' '}
                    <div ref={noti} className={style.noti}>
                        <img src="data:image/png;base64,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" />
                        Thành công
                    </div>
                </div>
            </>
        )
    );
}

export default Page;
