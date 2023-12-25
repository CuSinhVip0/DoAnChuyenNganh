import React from 'react';
import styles from '@/styles/profile/PatientInfoForm.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faEdit,
    faInfo,
    faUser,
    faBirthdayCake,
    faPhone,
    faMapMarkerAlt,
    faMarsAndVenus,
} from '@fortawesome/free-solid-svg-icons';

const PatientInfoForm = ({data, onEdit, onDelete, onViewDetails}) => {
    if (!data) {
        return null;
    }

    return (
        <div className={styles.form_container}>
            <form>
                <div className={styles.container}>
                    <span>
                        <FontAwesomeIcon
                            icon={faUser}
                            className={styles.custom_icon}
                        />
                    </span>
                    <label>Họ và tên:</label>
                    <p>{data.hoTen}</p>
                </div>
                <div className={styles.container}>
                    <span>
                        <FontAwesomeIcon
                            icon={faBirthdayCake}
                            className={styles.custom_icon}
                        />
                    </span>
                    <label>Ngày sinh:</label>
                    <p>{data.ngaySinh}</p>
                </div>
                <div className={styles.container}>
                    <span>
                        <FontAwesomeIcon
                            icon={faPhone}
                            className={styles.custom_icon}
                        />
                    </span>
                    <label>Số điện thoại:</label>
                    <p>{data.sdt}</p>
                </div>
                <div className={styles.container}>
                    <span>
                        <FontAwesomeIcon
                            icon={faMarsAndVenus}
                            className={styles.custom_icon}
                        />
                    </span>
                    <label>Giới tính:</label>
                    <p>{data.gioiTinh}</p>
                </div>
                <div className={styles.container}>
                    <span>
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className={styles.custom_icon}
                        />
                    </span>
                    <label>Địa chỉ:</label>
                    <p>{data.diaChi}</p>
                </div>
            </form>
            <div className={styles.action_buttons}>
                <button
                    type="button"
                    onClick={onDelete}
                    className={styles.btn_delete}
                >
                    <span>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className={styles.custom_icon_action}
                        />
                    </span>
                    Xóa hồ sơ
                </button>
                <button
                    type="button"
                    onClick={onEdit}
                    className={styles.btn_edit}
                >
                    <span>
                        <FontAwesomeIcon
                            icon={faEdit}
                            className={styles.custom_icon_action}
                        />
                    </span>
                    Sửa hồ sơ
                </button>

                <button
                    type="button"
                    onClick={onViewDetails}
                    className={styles.btn_detail}
                >
                    <span>
                        <FontAwesomeIcon
                            icon={faInfo}
                            className={styles.custom_icon_action}
                        />
                    </span>
                    Chi tiết
                </button>
            </div>
        </div>
    );
};

export default PatientInfoForm;
