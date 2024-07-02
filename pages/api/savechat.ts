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
        const { chat } = req.body;
        console.log("chat data", { chat });
        const project = await collection.findOne({
          _id: new ObjectId(chat.projectId),
        });
        console.log("project data:", project);
        const projectData: any = project || {};
        const chatsd = projectData?.chats || [];
        chatsd.push(chat);
        const data = {
          chats: chatsd,
        };
        const options = { upsert: true };
        console.log("updating project data ", data);
        await collection
          .updateOne(
            { _id: new ObjectId(chat.projectId) },
            { $set: data },
            options
          )
          .then((resp) => {
            console.log("update task", resp);
            return res.send({
              status: 200,
              data: { message: "all good", data: resp },
            });
          })
          .catch((err) => {
            console.log("updatet task:", err);
            return res
              .status(400)
              .send({ status: 400, data: "error in fetching" });
          });
      } catch (error) {
        return res.status(400).send({ status: 400, data: error });
      }
      break;
    case "GET":
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
