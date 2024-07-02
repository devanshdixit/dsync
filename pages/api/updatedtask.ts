import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../config/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const taskcollection = db.collection(
    `${process.env.NEXT_PUBLIC_COLLECTION_TASK}`
  );
  switch (req.method) {
    case "POST":
      try {
        const { title,projectId } = req.body;
        const task = await taskcollection.findOne({ title: title, projectId: projectId });
        res.send({ status: 200, data: task });
      } catch (error) {
        console.log("get task:", error);
        return res
          .status(400)
          .send({
            status: 400,
            data: { message: "error in fetching task", data: error },
          });
      }
      break;
  }
}
