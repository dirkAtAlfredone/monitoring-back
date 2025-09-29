import { Request, Response } from "express";
import { ping as tcpp, probe } from "tcp-ping";
import * as icmpp from "ping";

export const icmpPing = async (req: Request, res: Response) => {

  const { address } = req.params;
  let icmp = await icmpp.promise.probe("192.168.1.217", {min_reply: 10});
  res.send({ip: address, isAlive: icmp.alive});
}