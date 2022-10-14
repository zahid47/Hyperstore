import mongoose from "mongoose";

export interface productInputType {
  name: string;
  slug?: string;
  description?: string;
  images?: string[];
  storeId: mongoose.Schema.Types.ObjectId,
  prices: {
    price: number;
    option: string;
  }[];
}

export interface productDocument extends productInputType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
