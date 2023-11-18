import mysql from "mysql2/promise";

export default async function handler(req, res) {

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "doanchuyennganh",
    });

    try {
        await connection.execute("insert into account(username,password,role) values(?,?,?)",[req.body.username,req.body.password,"CUSTOMER"]);
        res.redirect(307,'/')
        
    } catch (error) {
      res.status(500).send(error.message)
    }

}
