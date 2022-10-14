import mongoose from "mongoose";

export interface userInputType {
  name: string;
  email: string;
  password: string;
  phone?: string;
  storeId: mongoose.Schema.Types.ObjectId,
  address?: {
    addressLine?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    comment?: string;
  };
}

export interface userDocument extends userInputType, mongoose.Document {
  verified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(givenPassword: string): Promise<boolean>;
}
