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
        const { title, projectId,data } = req.body;
        console.log("update task parama",{title,data,projectId});
        if (!data || !title || !projectId) {
          return res
            .status(400)
            .send({ status: 400, data: "no data received" });
        }
        await taskcollection
          .updateOne({ title: title, projectId: projectId }, { $set  : data})
          .then((resp) => {
            console.log("update task",resp)
            return res.send({
              status: 200,
              data: { message: "all good", data: resp },
            });
          })
          .catch((err) => {
            console.log("updatet task:",err);
            return res
              .status(400)
              .send({ status: 400, data: "error in fetching" });
          });
      } catch (error) {
        console.log("update task:",error);
        
        res.status(400).send({ status: 400, data: "error in fetching" });
      }
      break;
  }
}
