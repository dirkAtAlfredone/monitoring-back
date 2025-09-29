import { Router } from "express";
import { icmpPing } from "../controllers/ping";

export const pingRoute = Router();

pingRoute.get("/icmp/:address", icmpPing);
