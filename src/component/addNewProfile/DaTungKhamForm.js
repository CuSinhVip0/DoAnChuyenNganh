import React from 'react';

const DaTungKhamForm = () => {
    return (
        <form>
            <label>Tên bác sĩ:</label>
            <input type="text" name="doctorName" />
            {/* Thêm các trường thông tin khác tùy thuộc vào yêu cầu */}
            <button type="submit">Tạo hồ sơ</button>
        </form>
    );
};

export default DaTungKhamForm;
