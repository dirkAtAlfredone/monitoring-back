import { Address } from "../models/address";
import * as icmpp from "ping";

export const initiatePing = async () => {
  const hosts = await Address.find({});
  const pings = hosts.map(async (host) => {
    return await icmpp.promise.probe(host.ip, {min_reply: 10});
  });
  const servers = await Promise.all(pings);
  for (let server of servers){
    const host = hosts.find(h => h.ip === server.inputHost);
    const liveStatus = server.alive ? "live" : "unreachable";
    if(host?.status !== liveStatus){
      const newAddress = await Address.findByIdAndUpdate(host?._id, {status: liveStatus});
    }
  }
}