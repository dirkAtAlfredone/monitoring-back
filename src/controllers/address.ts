import { Request, Response } from "express";
import { Address } from "../models/address";

export const postAddress = async (req: Request, res: Response) => {
  const body = req.body;
  try{
    const address = await Address.create(body);
    res.status(201).json(address);
  } catch(e){
    console.log(e.message);
    res.status(400).json(e.message);
  }
}

export const getAllAddresses = async (req: Request, res: Response) => {
  try{
    const addresses = await Address.find({});
    res.json(addresses);
  }catch(e){
    res.sendStatus(500);
  }
}

export const getStatus = async (req: Request, res: Response) => {
  const {id} = req.params;
  console.log(id)
  try{
    const add = await Address.findById(id);
    console.log(add);
    res.json({
      id: add?.id,
      ip: add?.ip,
      status: add?.status
    });
  } catch(e){
    res.sendStatus(500);
  }
}