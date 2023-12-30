import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });

    try {
        const id = req.query.id;
        console.log(id);

        const [rows] = await connection.execute(
            'SELECT id_nguoidung, ten, ngay_sinh, sdt, gioi_tinh, bhyt, email, dia_chi FROM patient WHERE id_nguoidung LIKE ?',
            [id],
        );
        // Gửi dữ liệu bệnh nhân dưới dạng JSON
        res.status(200).json({result: rows});
    } catch (error) {
        // Ghi lại lỗi để debug
        console.error('Error fetching patient data:', error);

        res.status(500).json({error: 'Internal Server Error'});
    } finally {
        // Ngắt kết nối dâtbasse
        connection.end();
    }
}
