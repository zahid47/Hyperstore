import mongoose from "mongoose";
import { orderDocument } from "./order.type";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        option: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    payment: {
      paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
        required: true,
      },
      method: {
        type: String,
        enum: ["cash", "card"],
        required: true,
        default: "cash",
      },
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<orderDocument>("Order", orderSchema);
export default Order;
