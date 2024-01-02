import mysql from 'mysql2/promise';
import {v4 as uuidv4} from 'uuid';

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });

    try {
        const profile = req.body;
        const id = uuidv4();
        await connection.execute(
            'insert into patient (id_nguoidung,ten,dia_chi,gioi_tinh,ngay_sinh,sdt,email,id_hoso)  values(?,?,?,?,?,?,?,?) ',
            [
                id,
                profile.ten,
                `${profile.nha}, ${profile.xa}, ${profile.huyen}, ${profile.tinh}`,
                profile.gioitinh,
                new Date(profile.ngay)
                    .toISOString()
                    .slice(0, 19)
                    .replace('T', ' '),
                profile.sdt,
                profile.mail,
                profile.id,
            ],
        );

        res.status(200).json({result: 'oke'});
    } catch (error) {
        //không cung cấp dữ liệu
        // Ghi log lỗi để debug
        console.error('Lỗi trong quá trình đăng nhập:', error);

        // Cung cấp thông báo lỗi chi tiết hơn cho client
        res.status(500).json({error: 'fail'});
    } finally {
        // Đóng kết nối với cơ sở dữ liệu
        connection.end();
    }
}
