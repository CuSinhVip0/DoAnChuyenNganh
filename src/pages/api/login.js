export default function handler(req, res) {
    if (req.method === "POST") {
      const { username, password } = req.body;
  
      // Thực hiện xác thực đăng nhập ở đây 
      if (username === "user" && password === "password") {
        return res.status(200).json({ message: "Đăng nhập thành công" });
      } else {
        return res.status(401).json({ error: "Đăng nhập thất bại" });
      }
    } else {
      return res.status(405).json({ error: "Không hợp lệ" });
    }
  }
  