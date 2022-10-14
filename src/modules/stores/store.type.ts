import mongoose from "mongoose";

export interface storeInputType {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  primaryColor?: string;
}

export interface storeDocument extends storeInputType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
