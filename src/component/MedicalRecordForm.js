import React, {useState} from 'react';
import styles from '@/styles/profile/MedicalRecordForm.module.css';

const MedicalRecordForm = () => {
    const [formData, setFormData] = useState({
        maBenhAn: 'sadad',
        tenNguoiBenh: 'sadada',
        thoiGianTiepNhan: 'asdasd',
        thoiGianRaVien: 'asdasd',
        noiTiepNhan: 'asdasdasd',
        tongSoNgay: 'asdasdad',
        chanDoan: 'adasdad',
        ketQua: 'adsadasd',
        nguoiLapBenhAn: 'asdasdasd',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    return (
        <form className={styles.form_container}>
            <label>Mã bệnh án:</label>
            <p>{formData.maBenhAn}</p>

            <label>Tên người bệnh:</label>
            <p>{formData.tenNguoiBenh}</p>

            <label>Thời gian tiếp nhận:</label>
            <p>{formData.thoiGianTiepNhan}</p>

            <label>Thời gian ra viện:</label>
            <p>{formData.thoiGianRaVien}</p>

            <label>Nơi tiếp nhận:</label>
            <p>{formData.noiTiepNhan}</p>

            <label>Tổng số ngày:</label>
            <p>{formData.tongSoNgay}</p>

            <label>Chẩn đoán:</label>
            <p>{formData.chanDoan}</p>

            <label>Kết quả:</label>
            <p>{formData.ketQua}</p>

            <label>Người lập bệnh án:</label>
            <p>{formData.nguoiLapBenhAn}</p>
        </form>
    );
};

export default MedicalRecordForm;
