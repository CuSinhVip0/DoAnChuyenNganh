import React from 'react';
import styles from '../../styles/editprofile/EditProfileForm.module.css';

import {useRouter} from 'next/router';
const addProfile = ({id}) => {
    const router = useRouter();

    const renderDropdownOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(
                <option key={i} value={i}>
                    {i}
                </option>,
            );
        }
        return options;
    };

    return (
        <div className={styles.container}>
            <h2>Cập nhật thông tin</h2>
            <p>
                Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất.
                Trong trường hợp cung cấp sai thông tin bệnh nhân & điện thoại,
                việc xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt khám.
            </p>

            <form className={styles.form}>
                <div className={styles.row}>
                    <label>Họ và tên *</label>
                    <input type="text" name="ten" value={'ten'} required />
                </div>

                <div className={styles.row}>
                    <label>Ngày sinh (ngày/tháng/năm) *</label>
                    <div className={styles.date_fields}>
                        <div className={styles.customDropdown}>
                            <select name="day" value={'dd'} required>
                                <option value="" disabled></option>
                                {renderDropdownOptions(1, 31)}
                            </select>
                        </div>

                        <div className={styles.customDropdown}>
                            <select name="month" value={'mm'} required>
                                <option value="" disabled></option>
                                {renderDropdownOptions(1, 12)}
                            </select>
                        </div>

                        <div className={styles.customDropdown}>
                            <select name="year" value={'yyyy'} required>
                                <option value="" disabled></option>
                                {renderDropdownOptions(
                                    1900,
                                    new Date().getFullYear(),
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <label>Số điện thoại *</label>
                    <input type="tel" name="sdt" value={'sdt'} required />
                </div>

                <div className={styles.row}>
                    <label>Giới tính *</label>
                    <select name="gioi_tinh" value={'gioi_tinh'} required>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>

                <div className={styles.row}>
                    <label>BHYT</label>
                    <input type="text" name="bhyt" value={'bhyt'} />
                </div>

                <div className={styles.row}>
                    <label>Địa chỉ Email</label>
                    <input type="text" name="email" value={'email'} required />
                </div>

                <div className={styles.row}>
                    <label>Địa chỉ *</label>
                    <input
                        type="text"
                        name="dia_chi"
                        value={'dia_chi'}
                        required
                    />
                </div>
            </form>

            <div className={styles.btn_wrapper}>
                <button type="submit">Cập nhật</button>
            </div>
        </div>
    );
};

export default addProfile;
