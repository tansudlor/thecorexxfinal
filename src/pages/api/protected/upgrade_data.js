import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // อ่านไฟล์ data.json
      const filePath = path.join(process.cwd(), "data", "data.json");
      const fileContents = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContents);
      console.log(data);
      // ดึงข้อมูลจาก query string
      const { skillname } = req.query;
      console.log("skillname", skillname);

      if (skillname.toLowerCase() == "all") {
        res.setHeader(
          "Cache-Control",
          "s-maxage=3600, stale-while-revalidate=59"
        );
        console.log();
        res.status(200).json(data);
        return;
      }
      // ตรวจสอบว่า category นั้นมีอยู่ใน data.json หรือไม่
      if (!data[skillName]) {
        return res.status(404).json({ error: "Category not found." });
      }

      res.setHeader(
        "Cache-Control",
        "s-maxage=3600, stale-while-revalidate=59"
      );

      // ถ้าพบ level ที่ตรงกัน ส่งกลับข้อมูลนั้นไปที่ frontend
      res.status(200).json(data[skillname]);
    } catch (error) {
      console.error("Error reading data.json:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
