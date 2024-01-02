import Nav from '@/component/nav';
import React, {useState, useEffect} from 'react';
import style from '@/styles/bmi/bmi.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {FaHospitalAlt} from 'react-icons/fa';
import {AiOutlineRollback} from 'react-icons/ai';
import {useRef} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {hasCookie} from 'cookies-next';
export const getServerSideProps = ({req, res}) => {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {props: {hascookie}};
};

function Page(props) {
    const router = useRouter();
    const {id} = router.query; // Lấy id từ URL
    const [gioiTinh, setgioiTinh] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bmiResult, setBmiResult] = useState(null);

    //Tinh BMI
    const calculateBMI = (weight, height) => {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(2);
    };

    //Nhan xet BMI
    const getBMIComment = (bmi) => {
        if (bmi < 16) {
            return 'Gầy độ III';
        } else if (bmi < 17) {
            return 'Gầy độ II';
        } else if (bmi < 18.5) {
            return 'Gầy độ I';
        } else if (bmi < 25) {
            return 'Bình thường';
        } else if (bmi < 30) {
            return 'Thừa cân';
        } else if (bmi < 35) {
            return 'Béo phì độ I';
        } else if (bmi < 40) {
            return 'Béo phì độ II';
        } else {
            return 'Béo phì độ III';
        }
    };

    const handleViewResult = () => {
        const bmi = calculateBMI(weight, height);
        setBmiResult(bmi);
    };

    const handleReset = () => {
        setgioiTinh('');
        setHeight(0);
        setWeight(0);
        setBmiResult(null);
    };

    return (
        <>
            <Head>
                <title>BMI</title>
            </Head>
            <Nav hascookie={props.hascookie}></Nav>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.route}>
                        <Link className={style.route_link} href={'/'}>
                            Trang chủ
                        </Link>
                        <MdKeyboardArrowRight className="mlr_4px" />
                        <Link
                            className={`${style.route_link} font_color_1da1f2`}
                            href={''}
                        >
                            Kiểm tra chỉ số BMI
                        </Link>
                    </div>

                    <div className={style.content}>
                        <div className={style.check_bmi_results}>
                            <div
                                className={` ${style.title} text_align_center`}
                            >
                                ĐO CHỈ SỐ CHIỀU CAO - CÂN NẶNG (BMI)
                            </div>
                            <form
                                id="formViewResult"
                                action="/med_bmi/viewresult/"
                                method="post"
                            >
                                <div className={style.check_bmi_box}>
                                    <div
                                        className={`${style.box}  ${style.box_gioiTinh} ${style.control}`}
                                    >
                                        <h3>Giới tính của bạn</h3>
                                        <div className={style.radio}>
                                            <label>
                                                <span>
                                                    <svg
                                                        width="100%"
                                                        height="46"
                                                        viewBox="0 0 32 46"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M16.0047 0C7.1821 0 0 6.9312 0 15.4539C0 23.0045 5.6516 29.3073 13.049 30.6478V35.3184H8.85535C7.37399 35.3184 6.17581 36.4803 6.17581 37.9091C6.17581 39.3378 7.37399 40.4998 8.85535 40.4998H13.049V43.4093C13.049 44.8403 14.2519 46 15.7332 46C17.2146 46 18.4198 44.8358 18.4198 43.4093V40.4998H22.824C24.3054 40.4998 25.5059 39.3333 25.5059 37.9091C25.5059 36.4736 24.3054 35.3184 22.824 35.3184H18.4198V30.7315C26.1214 29.6011 32 23.1809 32 15.4539C32 6.9312 24.8273 0 16.0047 0ZM16.0047 25.7241C10.1378 25.7241 5.36844 21.1146 5.36844 15.4494C5.36844 9.78415 10.1378 5.17466 16.0047 5.17466C21.8669 5.17466 26.6386 9.78415 26.6386 15.4494C26.6386 21.1146 21.8692 25.7241 16.0047 25.7241Z"
                                                            fill="#D7D9DD"
                                                        />
                                                    </svg>
                                                    <input
                                                        type="radio"
                                                        name="gioiTinh"
                                                        value="Male"
                                                        checked={
                                                            gioiTinh === 'Male'
                                                        }
                                                        onChange={() =>
                                                            setgioiTinh('Male')
                                                        }
                                                    />
                                                    Nam
                                                </span>
                                            </label>
                                            <label>
                                                <span>
                                                    <svg
                                                        width="100%"
                                                        height="46"
                                                        viewBox="0 0 39 38"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M38.1958 0.783022C38.1819 0.77161 38.1634 0.762479 38.1541 0.751067C37.5283 0.143908 36.6616 -0.0957596 35.8597 0.0343458L26.5848 0.153038C25.1178 0.173581 23.9451 1.35823 23.9636 2.80308C23.9822 4.24337 25.0923 5.31845 26.652 5.38236L29.7576 5.34356L25.2128 9.81964C22.5105 7.85664 19.2567 6.79526 15.8336 6.79526C11.6017 6.79526 7.62247 8.41815 4.6305 11.3649C-1.5435 17.4479 -1.5435 27.3473 4.6305 33.4303C7.62247 36.3771 11.6017 38 15.8336 38C20.0632 38 24.0448 36.3771 27.0367 33.4303C32.5062 28.039 33.1389 19.6551 28.9163 13.5813L33.6881 8.8952V12.3167C33.6881 13.7616 34.8794 14.9303 36.3441 14.9303C37.8157 14.9303 39 13.7593 39 12.3167V2.63873C39 1.94484 38.701 1.27377 38.1958 0.783022ZM23.2823 29.7326C19.3053 33.6495 12.3689 33.6495 8.38727 29.7326C4.28055 25.6902 4.28055 19.1073 8.38727 15.0627C10.3781 13.1042 13.0224 12.0246 15.8359 12.0246C18.6518 12.0246 21.2915 13.1042 23.2869 15.0627C27.3913 19.105 27.3913 25.6902 23.2823 29.7326Z"
                                                            fill="#D7D9DD"
                                                        />
                                                    </svg>
                                                    <input
                                                        type="radio"
                                                        name="gioiTinh"
                                                        value="Female"
                                                        checked={
                                                            gioiTinh ===
                                                            'Female'
                                                        }
                                                        onChange={() =>
                                                            setgioiTinh(
                                                                'Female',
                                                            )
                                                        }
                                                    />
                                                    Nữ
                                                </span>
                                            </label>
                                        </div>

                                        <span
                                            className={
                                                style.fieldValidationValid
                                            }
                                            data-valmsg-for="gioiTinh"
                                            data-valmsg-replace="true"
                                        ></span>
                                    </div>

                                    <div
                                        className={`${style.box}  ${style.box_height} ${style.control}`}
                                    >
                                        <h3>Chiều cao của bạn</h3>
                                        <span>{height} cm</span>
                                        <div>
                                            <input
                                                className={style.slider}
                                                type="range"
                                                min="0"
                                                max="200"
                                                step="1"
                                                value={height}
                                                onChange={(e) =>
                                                    setHeight(
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={`${style.box}  ${style.box_weight} ${style.control}`}
                                    >
                                        <h3>Cân nặng của bạn</h3>
                                        <span>{weight} kg</span>
                                        <div>
                                            <input
                                                className={style.slider}
                                                type="range"
                                                min="0"
                                                max="200"
                                                step="1"
                                                value={weight}
                                                onChange={(e) =>
                                                    setWeight(
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className={style.actions}>
                                        <button
                                            id="btn-view-result"
                                            type="button"
                                            class={style.btn_primary}
                                            onClick={handleViewResult}
                                        >
                                            Xem kết quả
                                        </button>
                                        <button
                                            id="btn-reset"
                                            type="button"
                                            className={style.btn_outline}
                                            onClick={handleReset}
                                        >
                                            Đặt lại
                                        </button>
                                    </div>
                                </div>

                                <div
                                    id="panel-bmi-view"
                                    className={`check_bmi_results ${
                                        bmiResult ? '' : 'empty'
                                    }`}
                                >
                                    {bmiResult !== null ? (
                                        <div>
                                            <div className="results">
                                                <p>Kết quả BMI của bạn </p>
                                                <strong>{bmiResult}</strong>
                                            </div>
                                            <div className="text">
                                                <p>Nhận xét BMI của bạn</p>
                                                <strong>
                                                    {getBMIComment(bmiResult)}
                                                </strong>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="empty">
                                            <p>
                                                Điều chỉnh thanh trượt chiều cao
                                                và cân nặng để xem kết quả
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div
                                    id="panel-bmi-view-result"
                                    className={`check-bmi-results ${
                                        bmiResult ? '' : 'hidden'
                                    }`}
                                ></div>

                                <input
                                    name="__RequestVerificationToken"
                                    type="hidden"
                                    value="CfDJ8I96NPLj20pGgc_93Gw0US3BUhY1XFaRkDeE92IfBCCXOZcU73Ns68uN65Q2yYsIsf2E93xRGZXre4lX4VvvNrD9sGHZpMJtFCf3J50DDoUIai4shX98HuT4qhHQapQ4CMY4t3uYqbUZjIsmUVAigKk"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
