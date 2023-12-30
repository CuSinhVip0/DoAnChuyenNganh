import mysql from 'mysql2/promise';

export const gioKham = [
    {gio: '07:00 - 07:30', stt: [1, 2, 3]},
    {gio: '07:30 - 08:80', stt: [4, 5, 6, 7, 8, 9]},
    {gio: '08:30 - 09:30', stt: [10, 11, 12, 13, 14, 15]},
    {gio: '09:30 - 10:30', stt: [16, 17, 18, 19, 20, 21]},
    {gio: '10:30 - 11:00', stt: [22, 23, 24]},
    {gio: '13:00 - 13:30', stt: [25, 26, 27]},
    {gio: '13:30 - 14:30', stt: [28, 29, 30, 31, 32, 33]},
    {gio: '14:30 - 15:30', stt: [34, 35, 36, 37, 38, 39]},
    {gio: '15:30 - 16:30', stt: [40, 41, 42, 43, 44, 45]},
    {gio: '16:30 - 17:00', stt: [46, 47, 48]},
];

export async function abc(connection, row, xa) {
    //quet cac hang co cung idkhoa va ngay kham
    const [x] = await connection.execute(
        'select * from phieu_kham_benh where gio_kham = ? and id_Khoa = ? and ngay_kham=? and trang_thai_thanh_toan=1 order by sott desc ',
        [gioKham[xa].gio, row[0].id_Khoa, row[0].ngay_kham],
    );

    // lay ra cac so thu tu da duoc gan khi quet
    const a = x.map((x) => {
        return x.sott;
    });

    // lay ra cac so thu tu chua duoc gan
    var final = gioKham[xa].stt.filter((x) => !a.includes(x));

    // truong hop cac so thu tu da duoc gan het
    if (final.length == 0) {
        //goi lai ham va nang ai thoi gian kham len
        return abc(connection, row, xa + 1);
    }
    return {final: final, x: x, gio: gioKham[xa].gio};
}

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });
    try {
        const id = req.body;
        //lay thong tin idkhoa va ngay kham de xet
        const [row] = await connection.execute(
            'select * from phieu_kham_benh where id_phieuKham = ?',
            [id.id],
        );
        // da thanh toan
        if (row[0].trang_thai_thanh_toan == 1) {
            res.status(200).json({result: 'Đã thanh toán'});
            return;
        }

        //lay so thu tu cua gio kham ma nguoi dung dat
        const {stt} = gioKham.find((x) => row[0].gio_kham == x.gio);

        //vi tri cua gio trong mang  gioKham
        var xaa;
        gioKham.forEach((value, index) => {
            if (value.gio == row[0].gio_kham) {
                xaa = index;
                return;
            }
        });

        const k = await abc(connection, row, xaa);

        //xet truong gio chua co ai dat
        if (!k.x) {
            var [y] = await connection.execute(
                'update phieu_kham_benh set gio_kham =?, sott = ?,trang_thai_thanh_toan = 1 where id_phieuKham = ?',
                [k.gio, stt[0], id.id],
            );
        }
        //truong hop h da co nguoi dat
        else {
            var [y] = await connection.execute(
                'update phieu_kham_benh set gio_kham = ?, sott = ?,trang_thai_thanh_toan = 1 where id_phieuKham = ?',
                [k.gio, k.final[0], id.id],
            );
        }

        res.status(200).json({result: y});
        // //quet cac hang co cung idkhoa va ngay kham
        // const [x] = await connection.execute(
        //     'select * from phieu_kham_benh where gio_kham = ? and id_Khoa = ? and ngay_kham=? and trang_thai_thanh_toan=1 order by sott desc ',
        //     [row[0].gio_kham, row[0].id_Khoa, row[0].ngay_kham],
        // );

        // const {stt} = gioKham.find((x) => row[0].gio_kham == x.gio);
        // const a = x.map((x) => {
        //     return x.sott;
        // });
        // console.log(a);

        // var final = stt.filter((x) => !a.includes(x));
        // console.log(stt.filter((x) => !a.includes(x)));

        // //truong hop  các số tt trong giờ bị hết
        // if (final.length == 0) {
        //     var xa;
        //     gioKham.forEach((value, index) => {
        //         if (value.gio == row[0].gio_kham) {
        //             xa = index + 1;
        //             return;
        //         }
        //     });
        //     console.log(gioKham[xa].gio);
        //     const [x] = await connection.execute(
        //         'select * from phieu_kham_benh where gio_kham = ? and id_Khoa = ? and ngay_kham=? and trang_thai_thanh_toan=1 order by sott desc ',
        //         [gioKham[xa].gio, row[0].id_Khoa, row[0].ngay_kham],
        //     );

        //     const a = x.map((x) => {
        //         return x.sott;
        //     });

        //     final = gioKham[xa].stt.filter((x) => !a.includes(x));
        //     console.log(final);
        // }

        // // truong hop chua co phieu kham benh nao cung idkhoa va ngay kham
        // if (!x[0]) {
        //     var [y] = await connection.execute(
        //         'update phieu_kham_benh set sott = ?,trang_thai_thanh_toan = 1 where id_phieuKham = ?',
        //         [1, id.id],
        //     );
        // } else {
        //     var [y] = await connection.execute(
        //         'update phieu_kham_benh set sott = ?,trang_thai_thanh_toan = 1 where id_phieuKham = ?',
        //         [x[0].sott + 1, id.id],
        //     );
        // }
        // console.log(y);
    } catch (error) {
        res.status(500).json({result: error.message});
    } finally {
        connection.end();
    }
}
