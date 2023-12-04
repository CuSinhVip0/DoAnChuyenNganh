import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "doanchuyennganh",
    });

    try {
        const { username, password } = req.body;

        // Kiểm tra xem tài khoản có tồn tại không
        const [rows] = await connection.execute(
            "SELECT * FROM account WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            // Tài khoản không tồn tại
            return res.status(200).json({ message: "error_username" });
        }

        // So sánh mật khẩu
        const isValidPassword = await bcrypt.compare(
            password,
            rows[0].password
        );

        if (!isValidPassword) {
            // Sai mật khẩu
            return res.status(200).json({ message: "error_password" });
        }

        // Đăng nhập thành công
        res.status(200).json({ message: "oke", id: rows[0].id_nguoidung });
    } catch (error) {
        //không cung cấp dữ liệu
        // Ghi log lỗi để debug
        console.error("Lỗi trong quá trình đăng nhập:", error);

        // Cung cấp thông báo lỗi chi tiết hơn cho client
        res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
    } finally {
        // Đóng kết nối với cơ sở dữ liệu
        connection.end();
    }
}
