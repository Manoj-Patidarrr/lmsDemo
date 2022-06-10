/*jshint esversion: 11 */

import "dotenv/config";
import { connect } from "./src/config/database.js";
import express from "express";
import cors from "cors";
import { route } from "./src/controller/routes/index.js";
import morgan from "morgan";

connect();

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
  
app.use("/uploads", express.static("uploads"));
app.use(cors({ credentials: true }));
app.use("/shethink/v1", route(express.Router()));
app.get('/', (req, res) => {
  res.send('<h1>Hello World!manoj patel</h1>')
})

const port = process.env.PORT || 3211;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
