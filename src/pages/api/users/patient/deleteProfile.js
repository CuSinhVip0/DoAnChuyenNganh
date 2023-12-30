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

        // Thực hiện xóa dữ liệu trong database
        await connection.execute('DELETE FROM patient WHERE id_nguoidung = ?', [
            id,
        ]);

        // Thành công
        res.status(200).json({message: 'Xóa thành công'});
    } catch (error) {
        console.error('Lỗi xóa:', error);
        // Lỗi
        res.status(500).json({error: 'Internal server error'});
    } finally {
        // DĐóng kết nối database
        connection.end();
    }
}
