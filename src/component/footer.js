import Image from 'next/image';

import footer from '@/styles/footer/footer.module.css';

import Logo from '../../public/image/logo2.png';

function Footer() {
    return (
        <>
            <div className={footer.wrapper}>
                <div className={footer.container}>
                    <div className={footer.left}>
                        <Image width={300} src={Logo} />
                        <div className={footer.info}>
                            <span className={'textBold'}>Địa chỉ: </span>
                            180, Cao Lỗ, Phường 4, Quận 8, Tp. Hồ Chí Minh
                        </div>
                        <div className={footer.info}>
                            <span className={'textBold'}>
                                Đồ án chuyên ngành của:{' '}
                            </span>
                            <ul>
                                <li>Nguyễn Văn Sinh - DH52006075</li>
                                <li>Hà Xuân Tú - DH52006131</li>
                            </ul>
                        </div>
                    </div>
                    <div className={footer.right}>
                        <div className={footer.column}>
                            <div className={footer.title}>Chuyên Khoa</div>
                            <ul className={footer.items}>
                                <li className={footer.item}>
                                    Chức năng hô hấp
                                </li>
                                <li className={footer.item}>Da liễu</li>
                                <li className={footer.item}>Ngoại Lồng ngực</li>
                                <li className={footer.item}>Mắt</li>
                                <li className={footer.item}>Nội tiết</li>
                                <li className={footer.item}>Răng hàm mặt</li>
                                <li className={footer.item}>Tai mũi họng</li>
                                <li className={footer.item}>Thần kinh</li>
                                <li className={footer.item}>Tiết niệu</li>
                                <li className={footer.item}>Tiêu hóa</li>
                                <li className={footer.item}>Tim mạch</li>
                                <li className={footer.item}>Viêm gan</li>
                                <li className={footer.item}>Xương khớp</li>
                            </ul>
                        </div>
                        <div className={footer.column}>
                            <div className={footer.column_row}>
                                <div className={footer.title}>Tin tức</div>
                                <ul className={footer.items}>
                                    <li className={footer.item}>Tin dịch vụ</li>
                                    <li className={footer.item}>
                                        Y Học thường thức
                                    </li>
                                    <li className={footer.item}>Tin Y Tế</li>
                                </ul>
                            </div>
                            <div className={footer.column_row}>
                                <div className={footer.title}>Về chúng tôi</div>
                                <ul className={footer.items}>
                                    <li className={footer.item}>Giới thiệu</li>
                                    <li className={footer.item}>
                                        Điều khoản dịch vụ
                                    </li>
                                    <li className={footer.item}>
                                        Chính sách bảo mật
                                    </li>
                                    <li className={footer.item}>
                                        Quy định sử dụng
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={footer.column}>
                            <div className={footer.title}>Hướng dẫn</div>
                            <ul className={footer.items}>
                                <li className={footer.item}>
                                    Cài đặt ứng dụng
                                </li>
                                <li className={footer.item}>Đặt lịch khám</li>
                                <li className={footer.item}>
                                    Quy trình hoàn phí
                                </li>
                                <li className={footer.item}>
                                    Câu hỏi thường gặp
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
