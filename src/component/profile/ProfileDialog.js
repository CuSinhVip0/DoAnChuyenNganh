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
    const formattedDate = new Date(data.ngay_sinh).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    return (
        <div className={styles.dialog_container} onClick={handleOverlayClick}>
            <div className={styles.dialog_content}>
                <div className={styles.close_button} onClick={onClose}>
                    &times;
                </div>
                <h2>Chi tiết hồ sơ</h2>

                <div className={styles.content_wrapper}>
                    <div className={styles.container}>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Họ và tên:</strong>
                            <p>{data.ten}</p>
                        </p>
                    </div>
                    <div className={styles.container}>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faBirthdayCake}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Ngày sinh:</strong>
                            <p>{formattedDate}</p>
                        </p>
                    </div>
                    <div className={styles.container}>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Số điện thoại:</strong>
                            <p>{data.sdt}</p>
                        </p>
                    </div>
                    <div className={styles.container}>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faVenusMars}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Giới tính:</strong>
                            <p>{data.gioi_tinh}</p>
                        </p>
                    </div>
                    <div className={styles.container}>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faIdCard}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>BHYT:</strong> <p>{data.bhyt}</p>
                        </p>
                    </div>
                    <div className={styles.container}>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Email:</strong> <p>{data.email}</p>
                        </p>
                    </div>
                    <div className={styles.container}>
                        <p>
                            <span>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    className={styles.custom_icon}
                                />
                            </span>
                            <strong>Địa chỉ:</strong>
                            <p>{data.dia_chi}</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDialog;
