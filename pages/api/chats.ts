import { ObjectId, WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../config/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const collection = db.collection(
    `${process.env.NEXT_PUBLIC_COLLECTION_PROJECT}`
  );
  switch (req.method) {
    case "POST":
      try {
        const { projectData } = req.body;
        await collection
          .findOne({
            _id: new ObjectId(projectData.projectId),
          })
          .then((resp) => {
            console.log("project messages", resp);
            return res.send({
              status: 200,
              data: { status: 200, data: resp },
            });
          })
          .catch((err) => {
            console.log("get project messages:", err);
            return res
              .status(400)
              .send({ status: 400, data: "error in fetching" });
          });
      } catch (error) {
        return res.status(400).send({ status: 400, data: error });
      }
  }
}
