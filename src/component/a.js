import style from '@/styles/datLich/chonKhoa.module.css';

import {FaClock} from 'react-icons/fa6';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt, FaCalendarAlt} from 'react-icons/fa';
import {FaBriefcaseMedical} from 'react-icons/fa6';
import {AiOutlineRollback} from 'react-icons/ai';
export default function a({value, data}) {
    return (
        <>
            {' '}
            <li className={style.left_body_item}>
                <div className={style.item_icon}>
                    <FaBriefcaseMedical className={'w20_hf'} />
                </div>
                <div className={style.item_content}>
                    <p>
                        Chuyên khoa:{' '}
                        {data
                            .filter((v) => v.id_khoa == value.id_khoa)
                            .map((v) => v.ten_khoa)}
                    </p>
                </div>
            </li>
            <li className={style.left_body_item}>
                <div className={style.item_icon}>
                    <FaCalendarAlt className={'w20_hf'} />
                </div>
                <div className={style.item_content}>
                    <p>Ngày khám: {value.ngay}</p>
                </div>
            </li>
            <li className={style.left_body_item}>
                <div className={style.item_icon}>
                    <FaClock className={'w20_hf'} />
                </div>
                <div className={style.item_content}>
                    <p>Giờ khám: {value.gio}</p>
                </div>
            </li>
        </>
    );
}
