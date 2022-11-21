import Order from "./order.model";
import { orderedProductsType, orderInputType } from "./order.type";
import { UpdateQuery } from "mongoose";
import createError from "../../utils/createError";
import { findProduct } from "../products/product.service";

export const createOrder = async (input: orderInputType) => {
  try {
    return await (
      await (
        await Order.create(input)
      ).populate("products.product", "name prices")
    ).populate("user", "name");

    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findOrder = async (id: string) => {
  try {
    return await Order.findById(id)
      .populate("user", "name email phone address")
      .populate("products.product", "name");
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findOrders = async (
  limit: number,
  skip: number,
  storeId: string
) => {
  try {
    return await Order.find({ storeId: storeId })
      .limit(limit)
      .skip(skip)
      .populate("user", "name email phone address")
      .populate("products.product", "name");
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findOrdersByUser = async (
  userId: string,
  limit: number,
  skip: number
) => {
  try {
    return await Order.find({ user: userId })
      .limit(limit)
      .skip(skip)
      .populate("user", "name email phone address")
      .populate("products.product", "name");
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findAndUpdateOrder = async (
  id: string,
  update: UpdateQuery<Partial<orderInputType>>
) => {
  try {
    return await Order.findByIdAndUpdate(id, update, { new: true });
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findAndDeleteOrder = async (id: string) => {
  try {
    return await Order.findByIdAndDelete(id);
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const calculateTotal = async (
  orderedProducts: orderedProductsType[]
) => {
  try {
    let total = 0;

    for (const orderedProduct of orderedProducts) {
      const product = await findProduct(orderedProduct.product);
      if (!product)
        throw createError(404, "calculate total", "Product not found");

      for (const price of product.prices) {
        if (price.option === orderedProduct.option) {
          total = total + price.price * orderedProduct.quantity;
        }
      }
    }
    return total;
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};
