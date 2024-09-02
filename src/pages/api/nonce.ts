import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // สร้าง nonce ที่เป็น alphanumeric และมีความยาว 8 ตัวอักษร
  const nonce = Array.from(Array(8), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");

  res.setHeader(
    "Set-Cookie",
    `nonce=${nonce}; Path=/; HttpOnly; SameSite=Strict; Secure`
  );
  res.status(200).send(nonce);
}
