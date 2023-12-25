import mysql from 'mysql2/promise';
export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });

    try {
        const id_nguoiBenh = req.query.id;

        const result = await connection.execute(
            'Select * from phieu_kham_benh join patient on phieu_kham_benh.id_nguoiBenh = patient.id_nguoidung join khoa on phieu_kham_benh.id_Khoa = khoa.id_khoa where phieu_kham_benh.id_nguoiBenh = ?',
            [id_nguoiBenh],
        );

        res.status(200).json({result: result[0]});
    } catch (error) {
        //không cung cấp dữ liệu
        // Ghi log lỗi để debug

        // Cung cấp thông báo lỗi chi tiết hơn cho client
        res.status(500).json({result: error.message});
    } finally {
        // Đóng kết nối với cơ sở dữ liệu
        connection.end();
    }
}
