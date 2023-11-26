import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
export default async function handler(req, res) {

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "doanchuyennganh",
    });

    try {
        const{username, password} = req.body
        const hash = bcrypt.hashSync(password, 10);
        await connection.execute("insert into account(username,password,role,id_nguoidung) values(?,?,?,?)",[req.body.username,hash,"PATIENT",uuidv4()]);
        res.redirect(307,'/')
        
    } catch (error) {
      res.status(500).send(error.message)
    }

}
