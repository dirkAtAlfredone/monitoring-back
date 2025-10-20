import * as dotenv from "dotenv";

const result = dotenv.config();

if(result.error){
  console.log(result.error.message);
}

import { connect, connection } from "mongoose";
import { Address } from "../models/address";
import * as icmpp from "ping";

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const initiatePing = async () => {
  console.log("pinging...");
  connect(CONNECTION_STRING as string);
  const hosts = await Address.find({});
  const pings = hosts.map(async (host) => {
    return await icmpp.promise.probe(host.ip, { min_reply: 10 });
  });
  const servers = await Promise.all(pings);
  for (let server of servers) {
    const host = hosts.find(h => h.ip === server.inputHost);
    const liveStatus = server.alive ? "live" : "unreachable";
    if (host?.status !== liveStatus) {
      const newAddress = await Address.findByIdAndUpdate(host?._id, { status: liveStatus });
    }
  }
}

(async () => {
  await initiatePing();
  setInterval(async() => await initiatePing(), 60000);
})();

