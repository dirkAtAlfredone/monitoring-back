import { model, Schema } from "mongoose";

export enum HostStatus {
  live = "live",
  unreachable = "unreachable",
  pinging = "pinging"
}

export interface IAddress{
  ip: string,
  description: string,
  name: string,
  status: HostStatus
}

const addressSchema = new Schema<IAddress>({
  ip: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["live", "unreachable", "pinging"],
    default: HostStatus.pinging
  },
}, {
  timestamps: true,
  virtuals: true
});

addressSchema.set("toJSON", {virtuals: true});
addressSchema.set("toObject", {virtuals: true});

export const Address = model("Address", addressSchema);