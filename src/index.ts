import * as dotenv from "dotenv";

const result = dotenv.config();

if(result.error){
  console.log(result.error.message);
}

import * as express from "express";
import { addressRoute } from "./routes/address";

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = 4000;

const app = express();

app.use(express.json());

app.use("/api/v1/address", addressRoute);

app.use("/", (req, res) => res.json("You have reached Backend Server of AlfredOne Monitoring..."));

app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));