import mongoose from "mongoose";
import { storeDocument } from "./store.type";

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    logo: String,
    primaryColor: String,
  },

  { timestamps: true }
);

const Store = mongoose.model<storeDocument>("Store", storeSchema);
export default Store;
