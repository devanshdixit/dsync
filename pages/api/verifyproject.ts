import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../config/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const projcollection = db.collection(
    `${process.env.NEXT_PUBLIC_COLLECTION_PROJECT}`
  );
  switch (req.method) {
    case "POST":
      const { projectName } = req.body;
      console.log(projectName);
      if (!projectName) {
        return res.status(400).json({ status: 400, message: "no chat data" });
      }
      const project = await projcollection.findOne({ name: projectName });
      if (project) {
        return res.status(200).send({
          error: true,
          message: "The project name already exist",
        });
      } else {
        return res.status(200).send({
          error: false,
          message: "The project name does not already exist",
        });
      }
      break;
  }
}
