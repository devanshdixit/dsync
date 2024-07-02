import { WithId } from "mongodb";
import clientPromise from "../../config/mongodb";

export default async function handler(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const { address } = req.body;

  switch (req.method) {
    case "POST":
      console.log("User fethcing started", { address });
      let dat = await db
        .collection(`${process.env.NEXT_PUBLIC_COLLECTION_USERS}`)
        .findOne({ walletAddress: address });
      console.log("user", dat);
      if (!dat) {
        await db
          .collection(`${process.env.NEXT_PUBLIC_COLLECTION_USERS}`)
          .insertOne({ walletAddress: address, provider: "wallet" });
        dat = await db
          .collection(`${process.env.NEXT_PUBLIC_COLLECTION_USERS}`)
          .findOne({ walletAddress: address });
      }
      res.send({ status: 200, data: { message: dat } });
      break;
    case "GET":
      //   const dat = await db
      //     .collection(`${process.env.NEXT_PUBLIC_COLLECTION_USERS}`)
      //     .find()
      //     .toArray();
      //   res.json({ status: 200, data: dat });
      res.send({ status: 200, data: { message: "all good" } });
      break;
  }
}
