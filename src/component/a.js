import style from '@/styles/datLich/chonKhoa.module.css';
import {
    FaHospitalAlt,
    FaRegCalendarAlt,
    FaRegClock,
    FaRegUser,
    FaRegCreditCard,
} from 'react-icons/fa';
import {MdOutlineHome} from 'react-icons/md';
import {FaBriefcaseMedical} from 'react-icons/fa';
import {FiPhone} from 'react-icons/fi';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {format_date, checkDataCountry} from '@/functions/xoa_dau';

export default function a({dataCountry, data}) {
    return (
        <>
            <div className={`${style.left_container} mt_40`}>
                <div className={style.title}>Thông tin bệnh nhân</div>
                <div className={style.left_body}>
                    <ul>
                        <li className={style.left_body_item}>
                            <div className={style.item_icon}>
                                <FaRegUser />
                            </div>
                            <div className={style.item_content}>
                                <p>{data.ten}</p>
                            </div>
                        </li>
                        <li className={style.left_body_item}>
                            <div className={style.item_icon}>
                                <FiPhone />
                            </div>
                            <div className={style.item_content}>
                                <p>{data.sdt}</p>
                            </div>
                        </li>
                        <li className={style.left_body_item}>
                            <div className={style.item_icon}>
                                <MdOutlineHome />
                            </div>
                            <div className={style.item_content}>
                                <p>
                                    {checkDataCountry(
                                        data.dia_chi.split(', '),
                                        dataCountry,
                                    )}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
