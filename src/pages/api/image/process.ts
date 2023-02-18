import { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: "success" })
}
