import { Router } from "express";
import { getNodeIP, getResources } from "../controllers/resource";

export const resourceRoute = Router();

resourceRoute.get("/", getResources);

resourceRoute.get("/dns/node/:id", getNodeIP);