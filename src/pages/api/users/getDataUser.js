import mysql from 'mysql2/promise';
export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });
    try {
        const {id} = req.query;

        const [row] = await connection.execute(
            'select * from patient where id_nguoidung=?',
            [id],
        );
        res.status(200).json({result: row});
    } catch (error) {
        //không cung cấp dữ liệu
        // Ghi log lỗi để debug
        console.error('Lỗi trong quá trình đăng nhập:', error);

        // Cung cấp thông báo lỗi chi tiết hơn cho client
        res.status(500).json({error: 'Lỗi máy chủ nội bộ'});
    } finally {
        // Đóng kết nối với cơ sở dữ liệu
        connection.end();
    }
}