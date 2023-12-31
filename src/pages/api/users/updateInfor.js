import mysql from 'mysql2/promise';
export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });

    try {
        const profile = req.body;

        const x = await connection.execute(
            'update patient set ten = ?, ngay_sinh = ?, sdt = ?, gioi_tinh = ?, email = ?, bhyt = ?, dia_chi = ? WHERE id_nguoidung = ?',
            [
                profile.ten,
                new Date(profile.ngay_sinh)
                    .toISOString()
                    .slice(0, 19)
                    .replace('T', ' '),
                profile.sdt,
                profile.gioi_tinh,
                profile.email,
                profile.bhyt,
                profile.dia_chi,
                profile.id,
            ],
        );
        if (result && result.affectedRows === 1) {
            res.status(200).json({message: 'Cập nhật thông tin thành công'});
        } else {
            res.status(500).json({
                error: 'Cập nhật thông tin không thành công',
            });
        }
    } catch (error) {
        console.error(
            'Lỗi trong quá trình cập nhật thông tin bệnh nhân:',
            error,
        );
        res.status(500).json({error: 'Lỗi máy chủ nội bộ'});
    } finally {
        connection.end();
    }
}
