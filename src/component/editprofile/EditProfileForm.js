import React, {useState} from 'react';
import styles from '../../styles/editprofile/EditProfileForm.module.css';
const EditProfileForm = () => {
    const [formData, setFormData] = useState({
        hoTen: '',
        ngaySinh: '',
        sdt: '',
        gioiTinh: '',
        bhyt: '',
        diaChi: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission (e.g., update the profile)
        console.log('Form submitted with data:', formData);
        // Add additional logic, such as making an API call to update the profile
    };

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

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label>Họ và tên *</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.hoTen}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <label>Ngày sinh (năm/tháng/ngày) *</label>
                    <div className={styles.date_fields}>
                        {/* Day */}
                        <div className={styles.customDropdown}>
                            <select
                                name="day"
                                value={formData.day}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled></option>
                                {renderDropdownOptions(1, 31)}
                            </select>
                        </div>

                        {/* Month */}
                        <div className={styles.customDropdown}>
                            <select
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled></option>
                                {renderDropdownOptions(1, 12)}
                            </select>
                        </div>

                        {/* Year */}
                        <div className={styles.customDropdown}>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            >
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
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.sdt}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <label>Giới tính *</label>
                    <select
                        name="gender"
                        value={formData.gioiTinh}
                        onChange={handleChange}
                        required
                    >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>

                <div className={styles.row}>
                    <label>BHYT</label>
                    <input
                        type="text"
                        name="bhyt"
                        value={formData.bhyt}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.row}>
                    <label>Địa chỉ *</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.diaChi}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.btn_wrapper}>
                    <button type="submit">Cập nhật</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
