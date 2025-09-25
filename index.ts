import * as express from "express";

const PORT = 4000;
const app = express();

app.use("/", (req, res) => res.json("You have reached Backend Server of AlfredOne Monitoring..."));

app.listen(PORT, () => console.log(`Server started at port ${PORT}...`))