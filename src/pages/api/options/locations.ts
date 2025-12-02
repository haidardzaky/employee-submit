import type { NextApiRequest, NextApiResponse } from "next";
import dataLocations from "@/mocks/db/db-step2.json";

export default function handler(_req: NextApiRequest, _res: NextApiResponse) {
  try {
    _res.status(200).json(dataLocations);
  } catch (error) {
    console.error("API Error:", error);

    _res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
