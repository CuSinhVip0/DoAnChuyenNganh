import React, {useState, useEffect} from 'react';
import styles from '../../styles/editprofile/EditProfileForm.module.css';
import updateinfor from '../updateinfor';
import {useRouter} from 'next/router';
const EditProfileForm = ({id}) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        ten: '',
        ngay_sinh: {day: '', month: '', year: ''},
        sdt: '',
        gioi_tinh: '',
        bhyt: '',
        email: '',
        dia_chi: '',
    });

    const updatePatientData = async () => {
        const response = await fetch(
            'http://localhost:3000/api/users/updateInfor',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    ten: formData.ten,
                    ngay_sinh: `${formData.ngay_sinh.year}-${formData.ngay_sinh.month}-${formData.ngay_sinh.day}`,
                    sdt: formData.sdt,
                    gioi_tinh: formData.gioi_tinh,
                    bhyt: formData.bhyt,
                    email: formData.email,
                    dia_chi: formData.dia_chi,
                }),
            },
        );

        if (response.ok) {
            console.log('Patient information updated successfully');
            router.push('/profile');
        }
    };

    useEffect(() => {
        const fetchPatientData = async () => {
            const response = await fetch(
                `http:localhost:3000/api/users/patientData?id=${id}`,
            );
            const data = await response.json();

            if (!data) {
                return null;
            }
            if (response.ok) {
                const patientData = data.result[0];
                setFormData({
                    ten: patientData.ten || '',
                    ngay_sinh: {
                        day: patientData.ngay_sinh
                            ? patientData.ngay_sinh.day
                            : '',
                        month: patientData.ngay_sinh
                            ? patientData.ngay_sinh.month
                            : '',
                        year: patientData.ngay_sinh
                            ? patientData.ngay_sinh.year
                            : '',
                    },
                    sdt: patientData.sdt || '',
                    gioi_tinh: patientData.gioi_tinh || '',
                    bhyt: patientData.bhyt || '',
                    email: patientData.email || '',
                    dia_chi: patientData.dia_chi || '',
                });
            }
        };

        fetchPatientData();
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleDateChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            ngay_sinh: {
                ...prevData.ngay_sinh,
                [field]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updatePatientData();
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
                        name="ten"
                        value={formData.ten}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <label>Ngày sinh (ngày/tháng/năm) *</label>
                    <div className={styles.date_fields}>
                        <div className={styles.customDropdown}>
                            <select
                                name="day"
                                value={formData.ngay_sinh.day}
                                onChange={(e) =>
                                    handleDateChange('day', e.target.value)
                                }
                                required
                            >
                                <option value="" disabled></option>
                                {renderDropdownOptions(1, 31)}
                            </select>
                        </div>

                        <div className={styles.customDropdown}>
                            <select
                                name="month"
                                value={formData.ngay_sinh.month}
                                onChange={(e) =>
                                    handleDateChange('month', e.target.value)
                                }
                                required
                            >
                                <option value="" disabled></option>
                                {renderDropdownOptions(1, 12)}
                            </select>
                        </div>

                        <div className={styles.customDropdown}>
                            <select
                                name="year"
                                value={formData.ngay_sinh.year}
                                onChange={(e) =>
                                    handleDateChange('year', e.target.value)
                                }
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
                        name="sdt"
                        value={formData.sdt}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <label>Giới tính *</label>
                    <select
                        name="gioi_tinh"
                        value={formData.gioi_tinh}
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
                    <label>Địa chỉ Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <label>Địa chỉ *</label>
                    <input
                        type="text"
                        name="dia_chi"
                        value={formData.dia_chi}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>

            <div className={styles.btn_wrapper}>
                <button type="submit" onSubmit={handleSubmit}>
                    Cập nhật
                </button>
            </div>
        </div>
    );
};

export default EditProfileForm;
