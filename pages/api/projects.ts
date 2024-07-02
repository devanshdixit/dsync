import { WithId } from "mongodb";
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
      const data = req.body;
      console.log(data);
      let chats: any = [];
      if (!data) {
        return res.status(400).json({ status: 400, message: "no chat data" });
      }
      const project = await collection.findOne({ name: data.projectName });
      if (project?.chats) {
        chats = [...project?.chats, data];
      } else {
        chats.push(data);
      }

      const resp = await collection.updateOne(
        { name: data.projectName },
        { $set: { chats: chats } }
      );
      console.log("saved chat", resp);

      res.send({ status: 200, data: { message: "all good" } });
      break;
    case "GET":
      try {
        const dat = await db
          .collection(`${process.env.NEXT_PUBLIC_COLLECTION_PROJECT}`)
          .find()
          .toArray();
        res.json({ status: 200, data: dat });
      } catch (error) {
        res.json({ status: 400, data: "error in fetching!" });
      }
      break;
  }
}
