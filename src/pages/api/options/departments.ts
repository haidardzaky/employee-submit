import type { NextApiRequest, NextApiResponse } from "next";

import dataDepartments from "@/mocks/db/db-step1.json";

export default function handler(_req: NextApiRequest, _res: NextApiResponse) {
  try {
    _res.status(200).json(dataDepartments);
  } catch (error) {
    console.error("API Error:", error);

    _res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
