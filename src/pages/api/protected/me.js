import jwt from "jsonwebtoken";
import userDB from "../../../models/user";

const uri = process.env.MONGODB_URI;
const port = process.env.MONGODB_PORT ?? "27024";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ดึงชื่อฐานข้อมูลจาก URI
const dbNameMatch = uri.match(/\/([^/?]+)(\?|$)/);
const MONGODB_DB = dbNameMatch ? dbNameMatch[1] : null;

if (!MONGODB_DB) {
  throw new Error("Failed to determine the database name from the URI");
}

let cachedClient = null;
let cachedDb = null;

export default async function handler(req, res) {
  try {
    const address = req.cookies["address"];

    if (!address) {
      return res.status(400).json({ error: "Invalid address" });
    }

    // เช็คว่าที่อยู่มีในคอลเลกชันหรือไม่
    const user = await userDB.findOne({ id: address });
    console.log("user ", user);
    if (user) {
      // ถ้ามี address อยู่แล้วในคอลเลกชัน ให้ส่งข้อมูลกลับ
      res.status(200).json(user);
    } else {
      // ถ้าไม่มี address ให้เพิ่มใหม่
      const person = new userDB({
        id: address,
        address: address,
        resource: { branch: 5000, stone: 5000, iron: 5000 },
        currency: { brk: 0, pebble: 0, usdt: 0, pbux: 0, lotto: 0 },
        upgrade: {
          battery: 0,
          vision: 0,
          control: 0,
          barrior: 0,
          magnet: 0,
          lucky: 0,
          engine: 0,
        },
        score: 0,
      });
      await person.save();
      res.status(201).json(person);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
