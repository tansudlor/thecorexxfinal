import { ethers, Signer } from "ethers";

export default class API {
  public static APIEndPoint = "/api/"; // ตั้งค่าจุดปลายทางของ API

  // ฟังก์ชันสำหรับส่งข้อมูลอัปเกรดไปยังเซิร์ฟเวอร์
  static async SendUpgrade(dataToSend) {
    try {
      // ร้องขอการส่งข้อมูลไปยังเซิร์ฟเวอร์ด้วย HTTP POST
      const response = await fetch(API.APIEndPoint + "protected/upgrade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ส่งคุกกี้ไปพร้อมกับ request
        body: JSON.stringify(dataToSend), // แปลงข้อมูลที่ส่งเป็น JSON
      });

      // ตรวจสอบว่าการร้องขอสำเร็จหรือไม่
      if (response.ok) {
        const responseData = await response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
        console.log("Response from server:", responseData);
        return responseData; // ส่งค่ากลับถ้าต้องการใช้ต่อ
      } else {
        const errorData = await response.json(); // แปลงข้อมูลข้อผิดพลาดที่ได้รับเป็น JSON
        console.error("Error:", errorData);
        throw new Error("Failed to send data"); // โยนข้อผิดพลาดถ้าส่งข้อมูลไม่สำเร็จ
      }
    } catch (error) {
      console.error("Network error:", error);
      throw error; // ส่งข้อผิดพลาดกลับ
    }
  }

  // ฟังก์ชันสำหรับส่งลายเซ็นไปยัง backend
  public static async sendSignatureToBackend(
    signature: string,
    message: string,
    callback: (result: any) => void
  ) {
    try {
      // ร้องขอการส่งลายเซ็นไปยัง backend ด้วย HTTP POST
      const response = await fetch(API.APIEndPoint + "auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          signature: signature, // ส่งข้อความและลายเซ็นไปยัง backend
        }),
      });

      // ตรวจสอบว่าการร้องขอสำเร็จหรือไม่
      if (!response.ok) {
        callback(null); // ถ้าการร้องขอไม่สำเร็จ เรียก callback ด้วยค่า null
      }

      const result = await response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
      console.log("Backend response:", result);

      // Execute the callback with the result
      callback(result); // เรียก callback พร้อมผลลัพธ์ที่ได้รับ
    } catch (error) {
      console.error("Error sending signature to backend:", error);
      callback(null); // ถ้ามีข้อผิดพลาด เรียก callback ด้วยค่า null
    }
  }

  // ฟังก์ชันสำหรับดึงค่า nonce
  public static async getNonce(callback) {
    fetch("/api/nonce", {
      method: "GET",
      credentials: "include", // ส่งคุกกี้ไปพร้อมกับคำขอ
    })
      .then((response) => response.text()) // แปลงข้อมูลที่ได้รับเป็นข้อความ
      .then((data) => {
        callback(data); // ส่งค่า nonce กลับใน callback
      })
      .catch((error) => console.error("Error fetching nonce:", error)); // ถ้ามีข้อผิดพลาด ให้แสดงข้อความใน console
  }

  // ฟังก์ชันสำหรับดึงข้อความจาก endpoint /protected/hello
  public static async getHello(callback) {
    fetch("/api/protected/hello", {
      method: "GET",
      credentials: "include", // ส่งคุกกี้ไปพร้อมกับคำขอ
    })
      .then((response) => response.text()) // แปลงข้อมูลที่ได้รับเป็นข้อความ
      .then((data) => {
        callback(data); // ส่งข้อความกลับใน callback
      })
      .catch((error) => console.error("Error fetching nonce:", error)); // ถ้ามีข้อผิดพลาด ให้แสดงข้อความใน console
  }

  // ฟังก์ชันสำหรับดึงข้อมูลจาก endpoint /piyapong
  public static async getpiyapong(callback) {
    fetch("/api/piyapong", {
      method: "GET",
      credentials: "include", // ส่งคุกกี้ไปพร้อมกับคำขอ
    })
      .then((response) => response.text()) // แปลงข้อมูลที่ได้รับเป็นข้อความ
      .then((data) => {
        callback(data); // ส่งข้อความกลับใน callback
      })
      .catch((error) => console.error("Error fetching nonce:", error)); // ถ้ามีข้อผิดพลาด ให้แสดงข้อความใน console
  }

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก endpoint /protected/me
  public static async GetMe(callback) {
    fetch("/api/protected/me", {
      method: "GET",
      credentials: "include", // ส่งคุกกี้ไปพร้อมกับคำขอ
    })
      .then((response) => response.text()) // แปลงข้อมูลที่ได้รับเป็นข้อความ
      .then((data) => {
        callback(data); // ส่งข้อความกลับใน callback
      })
      .catch((error) => console.error("Error fetching nonce:", error)); // ถ้ามีข้อผิดพลาด ให้แสดงข้อความใน console
  }

  // ฟังก์ชันสำหรับดึงข้อมูลการอัปเกรด
  public static async GetUpgradeData(skillName) {
    try {
      // สร้าง URL สำหรับร้องขอข้อมูล โดยส่ง skillName เป็น query parameter
      const response = await fetch(
        `/api/protected/upgrade_data?skillname=${encodeURIComponent(
          skillName
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ตรวจสอบว่าการร้องขอสำเร็จหรือไม่
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // แปลงข้อมูลที่ได้มาเป็น JSON
      const data = await response.json();

      // ส่งกลับข้อมูลที่ได้จาก API
      return data;
    } catch (error) {
      console.error("Error fetching upgrade data:", error); // แสดงข้อความใน console หากเกิดข้อผิดพลาด
      throw error; // โยนข้อผิดพลาดกลับ
    }
  }
}
