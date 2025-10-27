import { Router } from "express";
import { getResources } from "../controllers/resource";

export const resourceRoute = Router();

resourceRoute.get("/", getResources);