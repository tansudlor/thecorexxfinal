import KeyvMongo from "@keyv/mongo";
import Keyv from "keyv";

const uri = process.env.MONGODB_URI;
const port = process.env.MONGODB_PORT ?? "27024";

let keyv;
export const connectCache = () => {
  if (keyv) return keyv;
  const keyvMongo = new KeyvMongo(uri, {
    collection: "keyv_cache",
    directConnection: uri.includes(port),
    // ...(process.env.NODE_ENV === "development" && {
    //   directConnection: uri.includes(port),
    // }),
  });

  keyv = new Keyv({ store: keyvMongo });

  keyv.on("error", (err) => {
    console.error("Connection Error", err);
  });
  return keyv;
};

export async function getDataWithCache(key, func, ttl = 2900) {
  const keyv = connectCache();
  let data = await keyv.get(key);
  if (data) return JSON.parse(data);

  data = await func();

  await keyv.set(key, JSON.stringify(data), ttl);

  return data;
}

export default keyv;
