import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'doanchuyennganh',
    });
    try {
        const {username, password} = req.body;
        const hash = bcrypt.hashSync(password, 10);
        const id = uuidv4();
        await connection.execute(
            'insert into account(username,password,role) values(?,?,?)',
            [req.body.username, hash, 'PATIENT'],
        );
        await connection.execute(
            'insert into user(id_nguoidung,ten,username) values(?,?,?)',
            [id, 'nguoidung_' + id.split('-')[0], req.body.username],
        );
        res.redirect(307, '/login');
    } catch (error) {
        res.status(500).send(error.message);
    }
}
