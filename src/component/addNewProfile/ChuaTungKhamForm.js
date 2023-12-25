import React from 'react';

const ChuaTungKhamForm = () => {
    return (
        <form>
            {/* Thêm các trường thông tin cho người chưa từng khám */}
            <label>Tên bệnh:</label>
            <input type="text" name="diseaseName" />
            {/* Thêm các trường thông tin khác tùy thuộc vào yêu cầu */}
            <button type="submit">Tạo hồ sơ</button>
        </form>
    );
};

export default ChuaTungKhamForm;
