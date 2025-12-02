import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  _res: NextApiResponse
) {
  try {
    if (_req.method === "POST") {
      // Delay 3 detik
      await new Promise((resolve) => setTimeout(resolve, 3000));
      _res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.error("API Error:", error);
    _res.status(500).json({ message: "Internal Server Error" });
  }
}
