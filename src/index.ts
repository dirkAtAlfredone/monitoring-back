import * as dotenv from "dotenv";

const result = dotenv.config();

if(result.error){
  console.log(result.error.message);
}

import * as express from "express";
import { addressRoute } from "./routes/address";
import { connect, connection } from "mongoose";
import * as cors from "cors";
import { pingRoute } from "./routes/ping";

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = 4000;

connect(CONNECTION_STRING as string);

connection.on("connected", () => {console.log("Connected to MongoDB...")})

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/address", addressRoute);
app.use("/api/v1/ping", pingRoute);

app.use("/", (req, res) => res.json("You have reached Backend Server of AlfredOne Monitoring..."));

app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));