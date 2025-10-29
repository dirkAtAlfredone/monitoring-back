import { Router } from "express";
import { getNodeIP, getNodeStatus, getResources, getVMIP, getVMStatus } from "../controllers/resource";

export const resourceRoute = Router();

resourceRoute.get("/", getResources);

resourceRoute.get("/ip/node/:id", getNodeIP);

resourceRoute.get("/ip/vm/:node/:id", getVMIP);

resourceRoute.get("/status/node/:id", getNodeStatus);

resourceRoute.get("/status/:node/qemu/:id", getVMStatus);