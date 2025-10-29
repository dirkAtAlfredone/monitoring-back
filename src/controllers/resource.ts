import { Request, Response } from "express";
import axios from "axios";
import * as https from "https";
import { INode, INodeNet, IVM, IVMNetResult } from "../models/proxmox-ve";

const PVE_URI = process.env.PVE_URI;
const PVE_SECRET = process.env.PVE_SECRET;
const PVE_USER = process.env.PVE_USER;

const HTTPS_AGENT = new https.Agent({ rejectUnauthorized: false });
const AUTHORIZATION = `PVEAPIToken=${PVE_USER}=${PVE_SECRET}`;

export const getResources = async (req: Request, res: Response) => {
  const { data: proxmoxResponse } = await axios.get(`${PVE_URI}/api2/json/cluster/resources`, { headers: { Authorization: AUTHORIZATION }, httpsAgent: HTTPS_AGENT });
  const filterServer = proxmoxResponse.data.filter((resource: INode | IVM) => resource.type === "node").map((resource: INode) => {
    const tags = ["server", resource.node];
    return {
      ...resource,
      tags
    }
  });
  const filtervm = proxmoxResponse.data.filter((resource: INode | IVM) => resource.type === "qemu").map((resource: IVM) => {
    const tags = ["VM", resource.node]
    return {
      ...resource,
      tags
    };
  });
  res.status(200).json({ servers: filterServer, vms: filtervm });
};

export const getNodeIP = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = await axios.get(`${PVE_URI}/api2/json/nodes/${id}/network`, { headers: { Authorization: AUTHORIZATION }, httpsAgent: HTTPS_AGENT });
  const shapedData = (data.data as INodeNet[]).filter(data => !!data.address).map(data => {
    const { iface, method, type, netmask, address } = data;
    return { iface, method, type, netmask, address };
  });
  res.json(shapedData);
};

export const getNodeStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = await axios.get(`${PVE_URI}/api2/json/nodes/${id}/status`, { headers: { Authorization: AUTHORIZATION }, httpsAgent: HTTPS_AGENT });
  res.json({ status : !!data.data.uptime ? "online" : "offline" });
}

export const getVMIP = async (req: Request, res: Response) => {
  const { id, node } = req.params;
  try{
    const { data } = await axios.get(`${PVE_URI}/api2/json/nodes/${node}/qemu/${id}/agent/network-get-interfaces`, { headers: { Authorization: AUTHORIZATION }, httpsAgent: HTTPS_AGENT });
    const result = (data.data.result) as IVMNetResult[];
    const filteredresult = result.filter(vm => !!vm.name && vm.name !== "lo").map(address => {
      return {
          name: address.name,
          addresses: address["ip-addresses"]?.filter(ip => ip["ip-address-type"] === "ipv4").map(ip => ip["ip-address"])
      }
    });
    res.json(filteredresult);
  } catch (e){
    res.status(200).json([]);
  }
}

export const getVMStatus = async (req: Request, res: Response) => {
  const { id, node } = req.params;
  try{
    const { data } = await axios.get(`${PVE_URI}/api2/json/nodes/${node}/qemu/${id}/status/current`, { headers: { Authorization: AUTHORIZATION }, httpsAgent: HTTPS_AGENT });
    res.json({status: data.data.status});
  } catch(e){
    res.json(e);
  }
};