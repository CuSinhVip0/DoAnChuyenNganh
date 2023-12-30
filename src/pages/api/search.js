import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });
    const q = req.query.q;

    // xu ly truong hop q la rong
    if (q == '') {
        res.status(200).json({bacsi: 'none', khoa: 'none'});
        return;
    }

    var [rows] = await connection.execute(
        'SELECT * FROM nhan_vien_y_te join khoa on nhan_vien_y_te.id_khoa = khoa.id_khoa WHERE ten like ?',
        [`% ${q}%`],
    );

    if (rows.length == 0) {
        [rows] = await connection.execute(
            'SELECT * FROM nhan_vien_y_te join khoa on nhan_vien_y_te.id_khoa = khoa.id_khoa WHERE ten REGEXP ?',
            [`${q}`],
        );
    }

    const [khoa] = await connection.execute(
        'SELECT * FROM  khoa WHERE ten_khoa REGEXP ?',
        [`${q}`],
    );
    //truong hop khong tim thay bac si nao lien quan
    if (rows.length == 0 && khoa.length == 0) {
        res.status(200).json({bacsi: 'none', khoa: 'none'});
        return;
    }
    if (rows.length == 0) {
        const [row] = await connection.execute(
            'SELECT * FROM nhan_vien_y_te join khoa on nhan_vien_y_te.id_khoa = khoa.id_khoa WHERE  nhan_vien_y_te.id_khoa like ? limit ?',
            [khoa[0].id_khoa, 3],
        );
        res.status(200).json({bacsi: row, khoa: khoa});
        return;
    }
    if (khoa.length == 0) {
        if (rows.length < 3 && rows.length > 0) {
            const id = rows[0].id_nvyt;
            const tenkhoa = rows[0].id_khoa;
            const [row] = await connection.execute(
                'SELECT * FROM nhan_vien_y_te join khoa on nhan_vien_y_te.id_khoa = khoa.id_khoa WHERE id_nvyt not like ? and nhan_vien_y_te.id_khoa like ? limit ?',
                [id, tenkhoa, 3 - rows.length],
            );
            row.map((row) => rows.push(row));
            res.status(200).json({bacsi: rows, khoa: 'none'});
            return;
        }
    }
    if (rows.length < 3 && rows.length > 0) {
        const id = rows[0].id_nvyt;
        const tenkhoa = rows[0].id_khoa;
        const [row] = await connection.execute(
            'SELECT * FROM nhan_vien_y_te join khoa on nhan_vien_y_te.id_khoa = khoa.id_khoa WHERE id_nvyt not like ? and nhan_vien_y_te.id_khoa like ? limit ?',
            [id, tenkhoa, 3 - rows.length],
        );
        row.map((row) => rows.push(row));
    }
    res.status(200).json({bacsi: rows, khoa: khoa});

    /* 
        @tim ten khoa
        */
}
