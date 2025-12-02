import { AxiosError } from "axios";

import { NextApiResponse } from "next";

export const handleProxyError = async ({
  error,
  _res,
}: {
  error: any;
  _res: NextApiResponse;
}) => {
  const err = error as AxiosError<any>;

  const errorMessage = err.response?.data?.error;
  const statusCode = err.response?.status ?? 500;

  if (errorMessage) {
    return _res.status(statusCode).json(errorMessage);
  }

  return _res.status(500).json({ message: "Internal server error" });
};
