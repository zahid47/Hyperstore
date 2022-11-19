import mongoose from "mongoose";
import { storeDocument } from "./store.type";

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    description: String,
    logo: String,
    primaryColor: String,
  },

  { timestamps: true }
);

storeSchema.pre("save", function (next) {
  const store = this as unknown as storeDocument; // skipcq
  if (!store.isModified("name")) return next();

  store.slug = store.name.replaceAll(" ", "-");
  return next();
});

const Store = mongoose.model<storeDocument>("Store", storeSchema);
export default Store;
