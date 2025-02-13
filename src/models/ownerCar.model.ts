import mongoose, { Schema } from "mongoose";
import { IOwnerCar } from "../interfaces/ownerCar.interface";

const ownerCarSchema = new mongoose.Schema({
  
  license_plate: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

const OwnerCarModel = mongoose.model<IOwnerCar>("OwnerCar", ownerCarSchema);

export default OwnerCarModel;
