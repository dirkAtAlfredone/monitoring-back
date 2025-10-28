import { Request, Response } from "express";
import axios from "axios";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import { INode, INodeNet, IVM } from "../models/proxmox-ve";

const PVE_URI = process.env.PVE_URI;
const PVE_SECRET = process.env.PVE_SECRET;
const PVE_USER = process.env.PVE_USER;

export const getResources = async(req: Request, res: Response) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const authorization = `PVEAPIToken=${PVE_USER}=${PVE_SECRET}`;
  const {data: proxmoxResponse} = await axios.get(`${PVE_URI}/api2/json/cluster/resources`, {headers: {Authorization: authorization}, httpsAgent});
  const filterServer = proxmoxResponse.data.filter((resource: INode | IVM) => resource.type === "node");
  const filtervm = proxmoxResponse.data.filter((resource: INode | IVM) => resource.type === "qemu");
  res.status(200).json({servers: filterServer, vms: filtervm});
};

export const getNodeDNS = async(req: Request, res: Response) => {
  const {id} = req.params;
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const authorization = `PVEAPIToken=${PVE_USER}=${PVE_SECRET}`;
  const {data} = await axios.get(`${PVE_URI}/api2/json/nodes/${id}/network`, {headers: {Authorization: authorization}, httpsAgent});
  const shapedData = (data.data as INodeNet[]).filter(data => !!data.address).map(data => {
    const { iface, method, type, netmask, address } = data;
    return { iface, method, type, netmask, address };
  });
  res.json(shapedData);
};