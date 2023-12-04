// pages/bmi.js

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const BMIPage = () => {
    const router = useRouter();
    const {id} = router.query; // Lấy id từ URL
    const [bmiData, setBMIData] = useState(null);
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Giả sử bạn có một hàm API để lấy thông tin BMI từ id
    const fetchBMI = async (id) => {
        // Thực hiện logic để lấy thông tin BMI của người dùng
        // Ví dụ: const bmiData = await fetch(`/api/bmi/${id}`);
        // setBMIData(bmiData);
    };

    useEffect(() => {
        if (id) {
            fetchBMI(id);
        }
    }, [id]);

    const calculateBMI = (weight, height) => {
        const heightCen = height / 100;
        const bmi = weight / (heightCen * heightCen);
        return bmi.toFixed(2); // Làm tròn BMI đến 2 chữ số thập phân
    };

    const handleSaveBMI = async () => {
        // Thực hiện logic để kiểm tra xem thông tin BMI đã tồn tại chưa
        if (bmiData) {
            // Nếu thông tin BMI đã tồn tại, chuyển sang chế độ chỉnh sửa
            console.log('BMI already exists. Switching to edit mode.');
            setIsEditing(true);
        } else {
            // Nếu thông tin BMI chưa tồn tại, thực hiện thêm mới
            console.log('Adding new BMI.');
            const bmi = calculateBMI(weight, height);
            setBMIData({weight, height, bmi});
        }
    };

    const handleUpdateBMI = () => {
        // Thực hiện logic để cập nhật thông tin BMI (có thể gọi API hoặc lưu vào cơ sở dữ liệu)
        // Ví dụ: fetch(`/api/bmi/${id}`, { method: 'PUT', body: JSON.stringify({ weight, height }) });
        setIsEditing(false); // Khi cập nhật xong, chuyển về chế độ xem
    };

    return (
        <div>
            <h1>BMI Page</h1>
            {bmiData ? (
                <div>
                    <p>Chỉ số BMI của bạn là: {bmiData.bmi}</p>
                    {isEditing ? (
                        <div>
                            <label>
                                Cân nặng (kg):
                                <input
                                    type="text"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Chiều cao (cm):
                                <input
                                    type="text"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </label>
                            <br />
                            <button onClick={handleUpdateBMI}>
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Sửa</button>
                    )}
                </div>
            ) : (
                <div>
                    <label>
                        Cân nặng (kg):
                        <input
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Chiều cao (cm):
                        <input
                            type="text"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={handleSaveBMI}>Lưu</button>
                </div>
            )}
        </div>
    );
};

export default BMIPage;
