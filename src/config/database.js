/*jshint esversion: 9 */

import mongoose from "mongoose";
const { MONGODB_PORT } = process.env;
const { USER_NAME } =process.env;
const { USER_PASS } = process.env;
const DB_CONNECTION_STRING = `mongodb://${USER_NAME}:${USER_PASS}@52.87.243.146:${MONGODB_PORT}/lmsDemo?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`
export async function connect() {
  await mongoose
    .connect(DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info(`mongodb connected to port ${MONGODB_PORT}`);
    })
    .catch((e) => {
      console.error(
        "error occured while connecting to mongdb, message - " + e.message
      );
      process.exit(1);
    });
}
