// src/pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import Cors from 'cors';
import jwt from "jsonwebtoken";
import initMiddleware from '../../lib/init-middleware';
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";



// ตั้งค่า CORS
const cors = initMiddleware(
  Cors({
    origin: '*', // แทนที่ด้วย IP address ของคุณ
    credentials: true,
  })
);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log(req.body);
    const { message, signature } = req.body;
    console.log(message, signature);

    if (!message || !signature) {
      return res.status(400).json({ message: "Missing message or signature" });
    }

    const siweMessage = new SiweMessage(message);
    const { success, data } = await siweMessage.verify({ signature });

    if (success) {
      const fields = data;
      console.log("message", req.body , fields.nonce);
      const nonceMatch = req.body.message.match(/Nonce:\s*(\S+)/);
      const nonce = nonceMatch ? nonceMatch[1] : null;
      console.log("message", nonce , fields.nonce);
      if (fields.nonce !== nonce) {
        return res.status(400).json({ message: "Invalid nonce" });
      }

      // สร้าง JWT Token หลังจากยืนยันสำเร็จ
      const token = jwt.sign({ address: fields.address }, JWT_SECRET, {
        expiresIn: "3d",
      });

      // ตั้งค่า JWT Token ในคุกกี้ และ address
      const maxAge = 3 * 24 * 60 * 60; // คำนวณเวลา 3 วันเป็นวินาที
      res.setHeader(
        "Set-Cookie",
        [`auth-token=${token}; Max-Age=${maxAge}; Path=/;`,`address=${fields.address}; Path=/; Max-Age=${maxAge}`]
      );

      return res.status(200).json({ message: "Authentication successful" });
    } else {
      return res
        .status(400)
        .json({ message: "400 Invalid signature or message" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Invalid signature or message", error });
  }
}
