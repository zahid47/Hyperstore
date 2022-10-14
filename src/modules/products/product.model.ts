import mongoose from "mongoose";
import { productDocument } from "./product.type";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    description: String,
    images: [String],
    prices: {
      type: [
        {
          price: { type: Number, required: true },
          option: { type: String, required: true },
        },
      ],
      required: true,
    },
  },

  { timestamps: true }
);

productSchema.pre("save", function (next) {
  const product = this as unknown as productDocument; // skipcq
  if (!product.isModified("name")) return next();

  product.slug = product.name.replaceAll(" ", "-");
  return next();
});

const Product = mongoose.model<productDocument>("Product", productSchema);
export default Product;
