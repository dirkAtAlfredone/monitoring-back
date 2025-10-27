import { Request, Response } from "express";
import axios from "axios";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import { INode, IVM } from "../models/proxmox-ve";

const PVE_URI = process.env.PVE_URI;
const PVE_SECRET = process.env.PVE_SECRET;
const PVE_USER = process.env.PVE_USER;

export const getResources = async(req: Request, res: Response) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const authorization = `PVEAPIToken=${PVE_USER}=${PVE_SECRET}`;
  const {data: proxmoxResponse} = await axios.get(`${PVE_URI}/api2/json/cluster/resources`, {headers: {Authorization: authorization}, httpsAgent});
  const filterServer = proxmoxResponse.data.filter((resource: INode | IVM) => resource.type === "node");
  const filtervm = proxmoxResponse.data.filter((resource: INode | IVM) => resource.type === "qemu");
  console.log(filterServer)
  res.status(200).json({servers: filterServer, vms: filtervm});
}