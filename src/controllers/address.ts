import { Request, Response } from "express";

export const postAddress = async (req: Request, res: Response) => {
  res.json("postAddress reached...");
}

export const getAllAddresses = async (req: Request, res: Response) => {
  res.json("getAllAddresses reached...");
}