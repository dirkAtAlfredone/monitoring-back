import { Router } from "express";
import { getAllAddresses, postAddress } from "../controllers/address";

export const addressRoute = Router();

addressRoute.post("/", postAddress);

addressRoute.get("/", getAllAddresses);