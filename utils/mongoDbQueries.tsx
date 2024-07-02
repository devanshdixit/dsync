import * as Realm from "realm-web";
import { appConfig } from "../config/appConfig";
const {
  BSON: { ObjectId },
} = Realm;
// Creating a Realm App Instance
const app = new Realm.App({ id: appConfig.mongoDBAppId });




