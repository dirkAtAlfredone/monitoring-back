import { Request, Response } from "express";
import axios from "axios";
import * as https from "https";

const PVE_URI = process.env.PVE_URI;
const PVE_SECRET = process.env.PVE_SECRET;
const PVE_USER = process.env.PVE_USER;

export const getResources = async(req: Request, res: Response) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const authorization = `PVEAPIToken=${PVE_USER}=${PVE_SECRET}`;
  const {data} = await axios.get(`${PVE_URI}/api2/json/cluster/resources`, {headers: {Authorization: authorization}, httpsAgent});
  res.status(200).json(data);
}