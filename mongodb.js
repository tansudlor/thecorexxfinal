import mongoose from "mongoose";
import { connectCache } from "./cache";

const uri = process.env.MONGODB_URI;

let client;

async function connect() {
  if (uri) {
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      if (!global._mongoClientPromise) {
        console.log("connecting to mongo");
        client = await mongoose.connect(uri, {
          directConnection: uri.includes("27024"),
        });

        connectCache();
        console.log("connected");
      }
    } else if (!client) {
      console.log("connecting to mongo PROD");
      client = await mongoose.connect(uri, {
        directConnection: uri.includes("27024"),
      });
    }
  }
}

if (!client) connect();

export default client;
