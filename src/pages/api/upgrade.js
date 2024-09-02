// pages/api/saveData.js
import fs from "fs";
import path from "path";

// ฟังก์ชันในการบันทึกข้อมูลลงในไฟล์
const saveDataToFile = (data) => {
  // ระบุ path ของไฟล์ที่จะบันทึกข้อมูล
  const filePath = path.join(process.cwd(), "data", "data.json");
  console.log("filePath", filePath);
  // ตรวจสอบว่ามีโฟลเดอร์ data หรือไม่ ถ้าไม่มีให้สร้างใหม่
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // บันทึกข้อมูลในรูปแบบ JSON
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export default async function handler(req, res) {
  try {
    const allowedHosts = ["localhost:3000", "127.0.0.1:3000"]; // ระบุ host ที่อนุญาต
    const host = req.headers.host;

    if (!allowedHosts.includes(host)) {
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }

    // ยิง API เพื่อดึงข้อมูล (ตัวอย่างนี้ใช้ fetch แต่คุณสามารถปรับเปลี่ยน URL ได้)
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzUsIvQsGHDFfiIoCAWDLzL3ulrDoWQlB2R0QXpB8ZTmwGJRcJuevFcy8OWZf7pPX8Y/exec"
    );
    const data = await response.json();

    // บันทึกข้อมูลลงในไฟล์
    saveDataToFile(data);

    // ส่งข้อความกลับไปที่ frontend ว่าการบันทึกสำเร็จ
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Error saving data" });
  }
}
