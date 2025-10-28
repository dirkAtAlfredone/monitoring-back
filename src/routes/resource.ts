import { Router } from "express";
import { getNodeDNS, getResources } from "../controllers/resource";

export const resourceRoute = Router();

resourceRoute.get("/", getResources);

resourceRoute.get("/dns/node/:id", getNodeDNS);