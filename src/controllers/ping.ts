import { Request, Response } from "express";
import { ping as tcpp, probe } from "tcp-ping";
import * as icmpp from "ping";

export const icmpPing = async (req: Request, res: Response) => {

  const { address } = req.params;
  let { alive: isAlive } = await icmpp.promise.probe(address, {min_reply: 10});
  res.send({ip: address, isAlive});
}