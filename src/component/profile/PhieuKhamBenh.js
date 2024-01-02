import React from 'react';
import styles from '@/styles/profile/PhieuKhamBenh.module.css';
import {format_date} from '@/functions/xoa_dau';
import Link from 'next/link';
import {useRouter} from 'next/router';
const PhieuKhamBenh = ({data}) => {
    const router = useRouter();
    const form = React.useRef();
    const title = React.useRef();
    return (
        <div
            className={styles.form_container}
            // onClick={(e) => {
            //     form.current.classList.toggle('flex_display');
            //     title.current.classList.toggle('linear_00b5f1_00e0ff_36');
            //     title.current.classList.toggle('font_color_fff');
            // }}
        >
            <div
                ref={title}
                className={`${styles.select} linear_00b5f1_00e0ff_36`}
            >
                {data.ten}
            </div>
            <div ref={form} className={styles.form_phieu}>
                <div className={styles.info}>
                    <div className={styles.cosoyte}> BỆNH VIỆN MEDCONNECT</div>
                    <div className={styles.container}>
                        <label>Chuyên khoa: </label>
                        <p style={{textTransform: 'uppercase'}}>
                            {data.ten_khoa}
                        </p>
                    </div>
                    <div className={styles.container}>
                        <label>Dịch vụ: </label>
                        <p>Khám chuyên khoa</p>
                    </div>
                    <div className={styles.container}>
                        <label>Ngày khám: </label>
                        <p>{format_date(data.ngay_kham)}</p>
                    </div>
                    <div className={styles.container}>
                        <label>Giờ khám dự kiến: </label>
                        <p>{data.gio_kham}</p>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {data.trang_thai_thanh_toan ? (
                        <>
                            <div className={styles.trang_thai_oke}>
                                Đã thanh toán
                            </div>{' '}
                            <div
                                className={styles.trang_thai}
                                onClick={() => {
                                    router.push({
                                        pathname: '/chi-tiet-phieu-kham-benh',
                                        query: {id: data.id_phieuKham},
                                    });
                                }}
                            >
                                Xem chi tiết
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.trang_thai_fail}>
                                Chờ thanh toán
                            </div>
                            <div
                                className={styles.trang_thai}
                                onClick={() => {
                                    router.push({
                                        pathname:
                                            '/dat-lich/hinh-thuc-thanh-toan',
                                        query: {id: data.id_phieuKham},
                                    });
                                }}
                            >
                                Thanh toán ngay
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PhieuKhamBenh;
