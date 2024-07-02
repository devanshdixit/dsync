import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";
const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
const REGION = process.env.NEXT_PUBLIC_REGION;
const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;

const configVar = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

const s3 = new S3({
  region: configVar.region,
  accessKeyId: configVar.accessKeyId,
  secretAccessKey: configVar.secretAccessKey,
  signatureVersion: "v4",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type } = req.body;
    console.log("name",name);
    console.log("type",type);
    const fileParams = {
      Bucket: configVar.bucketName,
      Key: name,
      Expires: 6000,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
