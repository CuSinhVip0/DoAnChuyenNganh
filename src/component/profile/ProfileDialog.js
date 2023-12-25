import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faUser,
    faBirthdayCake,
    faPhone,
    faVenusMars,
    faIdCard,
    faMapMarkerAlt,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/profile/ProfileDialog.module.css';

const ProfileDialog = ({data, onClose}) => {
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains(styles.dialog_container)) {
            onClose();
        }
    };
    return (
        <div className={styles.dialog_container} onClick={handleOverlayClick}>
            <div className={styles.dialog_content}>
                <div className={styles.close_button} onClick={onClose}>
                    &times;
                </div>
                <h2>Chi tiết hồ sơ</h2>

                <div className={styles.content_wrapper}>
                    <div className={styles.strong_section}>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Họ và tên:</strong>
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faBirthdayCake}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Ngày sinh:</strong>
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Số điện thoại:</strong>
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faVenusMars}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Giới tính:</strong>
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faIdCard}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>BHYT:</strong>
                        </p>

                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Email:</strong>
                        </p>

                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Địa chỉ:</strong>
                        </p>
                    </div>
                    <div className={styles.weak_section}>
                        <p>{data.hoTen}</p>
                        <p>{data.ngaySinh}</p>
                        <p>{data.sdt}</p>
                        <p>{data.gioiTinh}</p>
                        <p>{data.bhyt}</p>
                        <p>{data.email}</p>
                        <p>{data.diaChi}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDialog;
