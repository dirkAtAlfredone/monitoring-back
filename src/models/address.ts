import { model, Schema } from "mongoose"

export interface IAddress{
  ip: string,
  description: string,
  name: string
}

const addressSchema = new Schema<IAddress>({
  ip: {
    type: String,
    required: true
  },
  description: String,
  name: {
    type: String,
    required: true
  }
});

export const Address = model("Address", addressSchema);