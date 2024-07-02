export const appConfig = {
  appName: "Async",
  logo: "/images/logo.png",
  S3_URL:
    process.env.NEXT_PUBLIC_S3_URL_API ||
    "https://async-network.s3.ap-south-1.amazonaws.com/",
  mongoDBAppId: process.env.NEXT_PUBLIC_MONGO_APP_ID || "",
  baseCurrency: "MATIC",
};
