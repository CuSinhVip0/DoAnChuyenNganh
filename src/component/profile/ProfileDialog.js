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

import {checkDataCountry} from '@/functions/xoa_dau';
import dataCountry from '../../../public/data/data';

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
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className={styles.custom_icon}
                            />
                            Họ và tên:
                        </div>
                        <div style={{flex: '3'}}>{data.ten}</div>
                    </div>
                    <div className={styles.container}>
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faBirthdayCake}
                                className={styles.custom_icon}
                            />
                            Ngày sinh:
                        </div>
                        <div style={{flex: '3'}}>{formattedDate}</div>
                    </div>
                    <div className={styles.container}>
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faPhone}
                                className={styles.custom_icon}
                            />
                            Số điện thoại:
                        </div>
                        <div style={{flex: '3'}}>{data.sdt}</div>
                    </div>
                    <div className={styles.container}>
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faVenusMars}
                                className={styles.custom_icon}
                            />
                            Giới tính:
                        </div>
                        <div style={{flex: '3'}}>{data.gioi_tinh}</div>
                    </div>
                    <div className={styles.container}>
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faIdCard}
                                className={styles.custom_icon}
                            />
                            BHYT:
                        </div>
                        <div style={{flex: '3'}}>{data.bhyt}</div>
                    </div>
                    <div className={styles.container}>
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className={styles.custom_icon}
                            />
                            Email:
                        </div>
                        <div style={{flex: '3'}}>{data.email}</div>
                    </div>
                    <div className={styles.container}>
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className={styles.custom_icon}
                            />
                            Địa chỉ:
                        </div>
                        <div style={{flex: '3'}}>
                            {checkDataCountry(
                                data.dia_chi.split(', '),
                                dataCountry,
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDialog;
