import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../config/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db(process.env.NEXT_PUBLIC_DATABASE);
  switch (req.method) {
    case "POST":
      try {
        const { projectName, title, isManager } = req.body;
        //   console.log({projectName, title, isManager})
        const taskcollection = db.collection(
          `${process.env.NEXT_PUBLIC_COLLECTION_TASK}`
        );
        if (isManager) {
          const tasks = await taskcollection
            .find({ projectId: projectName, status: "Staked" })
            .toArray();
          const draft = await taskcollection
            .find({ projectId: projectName, status: "Draft" })
            .toArray();
          const fi = draft.concat(tasks);
          // console.log(`${title}:`,fi);

          return res.send({ status: 200, data: fi });
        }
        const tasks = await taskcollection
          .find({ projectId: projectName, status: title })
          .toArray();
        // console.log(`${title}:`,tasks);
        res.send({ status: 200, data: tasks });
      } catch (error) {
        return res.status(400).send({ status: 400, data: "error in fetching" });
      }
      break;
  }
}
