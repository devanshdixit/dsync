import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../config/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const { id } = req.body;

  switch (req.method) {
    case "POST":
      if (!id) {
        return res.status(400).json({
          error: true,
          message: "No project Name!",
        });
      }
      try {
        const data = await db
        .collection(`${process.env.NEXT_PUBLIC_COLLECTION_PROJECT}`)
        .findOne({ name: id });
      res.send({ status: 200, data: data });
      } catch (error) {
      res.send({ status: 401, data: error });
      }
      break;
    case "GET":
      const dat = await db
        .collection(`${process.env.NEXT_PUBLIC_COLLECTION_PROJECT}`)
        .find()
        .toArray();
      res.json({ status: 200, data: dat });
      break;
  }
}
