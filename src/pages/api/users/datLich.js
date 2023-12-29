import mysql from 'mysql2/promise';
import {v4 as uuidv4} from 'uuid';
export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });
    var status;
    try {
        const data = req.body;
        const idphieukham = uuidv4();
        const date = data.info.ngay.split('/').reverse().join('-');
        status = await connection.execute(
            'INSERT INTO phieu_kham_benh (id_phieuKham, ngay_kham, gio_kham, id_Khoa,id_nguoiBenh) VALUES (?, ?, ?,  ?, ?)',
            [
                idphieukham,
                date,
                data.info.gio,
                data.info.id_khoa,
                data.id_nguoibenh,
            ],
        );

        res.status(200).json({result: idphieukham});
    } catch (error) {
        //không cung cấp dữ liệu
        // Ghi log lỗi để debug
        status = error;
        // Cung cấp thông báo lỗi chi tiết hơn cho client
        res.status(500).json({result: status});
    } finally {
        // Đóng kết nối với cơ sở dữ liệu
        connection.end();
    }
}
