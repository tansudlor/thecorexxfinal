import fs from "fs";
import path from "path";

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      updateData();
    }
    return config;
  },
};

async function updateData(params) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzUsIvQsGHDFfiIoCAWDLzL3ulrDoWQlB2R0QXpB8ZTmwGJRcJuevFcy8OWZf7pPX8Y/exec"
    );
    const data = await response.json();

    // บันทึกข้อมูลลงในไฟล์
    saveDataToFile(data);
  } catch {}
}

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

export default nextConfig;
