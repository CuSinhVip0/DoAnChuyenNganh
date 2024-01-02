import React, {useState} from 'react';
import styles from '@/styles/profile/MedicalRecordForm.module.css';

const MedicalRecordForm = () => {
    const [formData, setFormData] = useState({
        dichVu: 'Khám chuyên khoa',
        tenNguoiBenh: 'Nguyen Van',
        thoiGianTiepNhan: 'asdasd',
        thoiGianRaVien: 'asdasd',
        khoa: 'Khoa khám bệnh',
        phong: 'Phòng khám 01',
        chuanDoan: 'Viêm họng thanh quản mạn tính do Gerd',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    return (
        <div className={styles.form_container}>
            <div className={styles.select}>
                <span>{formData.tenNguoiBenh}</span>
            </div>
            <div className={styles.table_container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Ngày đón tiếp</th>
                            <th>Ngày xuất viện</th>
                            <th>Bệnh án</th>
                            <th>Khoa</th>
                            <th>Phòng</th>
                            <th>Chuẩn đoán</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{formData.thoiGianTiepNhan}</td>
                            <td>{formData.thoiGianRaVien}</td>
                            <td>{formData.dichVu}</td>
                            <td>{formData.khoa}</td>
                            <td>{formData.phong}</td>
                            <td>{formData.chuanDoan}</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>{formData.thoiGianTiepNhan}</td>
                            <td>{formData.thoiGianRaVien}</td>
                            <td>{formData.dichVu}</td>
                            <td>{formData.khoa}</td>
                            <td>{formData.phong}</td>
                            <td>{formData.chuanDoan}</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>{formData.thoiGianTiepNhan}</td>
                            <td>{formData.thoiGianRaVien}</td>
                            <td>{formData.dichVu}</td>
                            <td>{formData.khoa}</td>
                            <td>{formData.phong}</td>
                            <td>{formData.chuanDoan}</td>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicalRecordForm;
