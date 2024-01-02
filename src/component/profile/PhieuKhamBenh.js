import React from 'react';
import styles from '@/styles/profile/PhieuKhamBenh.module.css';
const PhieuKhamBenh = () => {
    return (
        <div className={styles.form_container}>
            <div className={styles.select}>
                <span>Nguyen Van A</span>
            </div>
            <ul>
                <li>
                    {' '}
                    <form className={styles.form_phieu}>
                        <div className={styles.info}>
                            <div>
                                <label className={styles.cosoyte}>
                                    BỆNH VIỆN ĐẠI HỌC Y DƯỢC
                                </label>
                            </div>
                            <div className={styles.container}>
                                <label>Chuyên khoa: </label>
                                <p>sadad</p>
                            </div>
                            <div className={styles.container}>
                                <label>Dịch vụ: </label>
                                <p>fasfaf</p>
                            </div>
                            <div className={styles.container}>
                                <label>Ngày khám: </label>
                                <p>fafaf</p>
                            </div>
                            <div className={styles.container}>
                                <label>Giờ khám dự kiến: </label>
                                <p>fafas</p>
                            </div>
                        </div>
                        <div className={styles.trang_thai}>
                            <label>Da thanh toan</label>
                        </div>
                    </form>
                </li>
            </ul>
        </div>
    );
};
export default PhieuKhamBenh;
