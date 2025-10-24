import { Router } from "express";
import { deleteAddress, getAllAddresses, getStatus, postAddress } from "../controllers/address";

export const addressRoute = Router();

addressRoute.post("/", postAddress);

addressRoute.get("/", getAllAddresses);

addressRoute.get("/status/:id", getStatus);

addressRoute.post("/delete", deleteAddress);