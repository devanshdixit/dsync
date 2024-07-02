import { useEffect, useState } from "react";
import * as Realm from "realm-web";

export function useRealmApp() {
  const [app, setApp] = useState(null);
  useEffect(() => {
    setApp(Realm.getApp(process.env.NEXT_PUBLIC_MONGO_APP_ID));
  }, []);
  return app;
}