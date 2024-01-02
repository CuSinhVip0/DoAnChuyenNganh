import style from '@/styles/component/updateinfor.module.css';
import {useEffect, useState, useRef, memo} from 'react';
import {FaAngleDown} from 'react-icons/fa6';
import data from '../../public/data/data.json';
import {format_date2} from '@/functions/xoa_dau';

function UpdateInfor({ref_form, user}) {
    const [p, setP] = useState([]);
    const provide = useRef();
    const district = useRef();
    const subdis = useRef();

    useEffect(() => {
        data.forEach((element) => {
            provide.current.innerHTML += `<option value=${element.Id}>${element.Name}</option>`;
        });
        if (!user) return;

        const diachi = user.result[0].dia_chi.split(', ');

        provide.current.value = diachi[diachi.length - 1];
        const tam = data.find((element) => element.Id == provide.current.value);

        setP(tam);
        showDistrict(tam);
        district.current.value = diachi[diachi.length - 2];
        const tam2 = tam.Districts.find(
            (element) => element.Id == district.current.value,
        );

        showSubDistrict(tam2);
        subdis.current.value = diachi[diachi.length - 3];
    }, [user]);

    function showDistrict(tam) {
        district.current.innerHTML = '';
        district.current.innerHTML +=
            ' <option>-- Vui lòng chọn quận / huyện --</option>';
        tam.Districts.forEach((element) => {
            district.current.innerHTML += `<option value=${element.Id}>${element.Name}</option>`;
        });
    }

    function showSubDistrict(tam) {
        tam.Wards.forEach((element) => {
            subdis.current.innerHTML += `<option value=${element.Id}>${element.Name}</option>`;
        });
    }
    return (
        <>
            <form className={style.container} ref={ref_form}>
                <div className={style.item}>
                    <div className={style.item_title}>Họ và tên (có dấu)</div>
                    <input
                        defaultValue={user ? user.result[0].ten : null}
                        type="text"
                        name="hoten"
                        className={style.item_input}
                        placeholder="Vd: Nguyễn Văn A"
                    />
                </div>
                <div className={style.item}>
                    <div className={style.item_title}>
                        Ngày sinh (năm/tháng/ngày)
                    </div>
                    <input
                        defaultValue={
                            user
                                ? user.result[0].ngay_sinh &&
                                  format_date2(user.result[0].ngay_sinh)
                                : null
                        }
                        type="date"
                        name="ngaysinh"
                        className={style.item_input}
                    />
                </div>
                <div className={style.item}>
                    <div className={style.item_title}>Số điện thoại</div>
                    <input
                        defaultValue={user ? user.result[0].sdt : null}
                        type="text"
                        name="sodienthoai"
                        className={style.item_input}
                        placeholder="Vd: 0912345678"
                    />
                </div>
                <div className={style.item}>
                    <div className={style.item_title}>Giới tính</div>
                    <div className={style.item_input_container}>
                        <FaAngleDown className={style.item_input_icon} />
                        <select
                            name="gioitinh"
                            defaultValue={
                                user ? user.result[0].gioi_tinh : null
                            }
                            className={style.item_input}
                        >
                            <option value={'nam'}>Nam</option>
                            <option value={'nu'}>Nữ</option>
                            <option value={'khac'}>Khác</option>
                        </select>
                    </div>
                </div>
                <div className={style.item}>
                    <div className={style.item_title}>Email</div>
                    <div className={style.item_input_container}>
                        <input
                            defaultValue={user ? user.result[0].email : null}
                            type="email"
                            name="email"
                            className={style.item_input}
                            placeholder="Vd: example@gmail.com"
                        />
                    </div>
                </div>
                <div className={style.item}>
                    <div className={style.item_title}>Tỉnh / Thành</div>
                    <div className={style.item_input_container}>
                        <FaAngleDown className={style.item_input_icon} />

                        <select
                            onChange={() => {
                                const tam = data.find(
                                    (element) =>
                                        element.Id == provide.current.value,
                                );
                                setP(tam);
                                showDistrict(tam);
                                subdis.current.innerHTML = '';
                                subdis.current.innerHTML +=
                                    ' <option>-- Vui lòng chọn phường / xã --</option>';
                                provide.current[0].hidden = true;
                            }}
                            name="tinh"
                            className={style.item_input}
                            ref={provide}
                        >
                            <option>-- Vui lòng chọn tỉnh / thành --</option>
                        </select>
                    </div>
                </div>
                <div className={style.item}>
                    <div className={style.item_title}>Quận / Huyện</div>
                    <div className={style.item_input_container}>
                        <FaAngleDown className={style.item_input_icon} />
                        <select
                            onChange={() => {
                                const tam = p.Districts.find(
                                    (element) =>
                                        element.Id == district.current.value,
                                );

                                showSubDistrict(tam);
                                district.current[0].hidden = true;
                            }}
                            name="huyen"
                            className={style.item_input}
                            ref={district}
                        >
                            <option>-- Vui lòng chọn quận / huyện --</option>
                        </select>
                    </div>
                </div>
                <div className={style.item}>
                    <div className={style.item_title}>Phường / Xã</div>
                    <div className={style.item_input_container}>
                        <FaAngleDown className={style.item_input_icon} />
                        <select
                            name="xa"
                            className={style.item_input}
                            ref={subdis}
                            onChange={() => {
                                subdis.current[0].hidden = true;
                            }}
                        >
                            <option>-- Vui lòng chọn phường / xã --</option>
                        </select>
                    </div>
                </div>
                <div className={style.item}>
                    <div className={style.item_title}>Số nhà</div>
                    <input
                        defaultValue={
                            user
                                ? user.result[0].ngay_sinh &&
                                  user.result[0].dia_chi
                                      .split(', ')
                                      .slice(
                                          0,
                                          user.result[0].dia_chi.split(', ')
                                              .length - 3,
                                      )
                                : null
                        }
                        type="text"
                        name="sonha"
                        className={style.item_input}
                        placeholder="Vd: 123 ABC"
                    />
                </div>
            </form>
        </>
    );
}

export default memo(UpdateInfor);
