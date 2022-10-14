import Store from "./store.model";
import { storeInputType } from "./store.type";
import { UpdateQuery } from "mongoose";

export const createStore = async (input: storeInputType) => {
  try {
    return await Store.create(input);
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findStore = async (id: string) => {
  try {
    return await Store.findById(id);
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findStoreBySlug = async (slug: string) => {
  try {
    return await Store.findOne({ slug: slug });
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findStores = async (
  query: object,
  limit: number,
  skip: number
) => {
  try {
    return await Store.find(query).limit(limit).skip(skip);
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findAndUpdateStore = async (
  id: string,
  update: UpdateQuery<Partial<storeInputType>>
) => {
  try {
    return await Store.findByIdAndUpdate(id, update, { new: true });
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findAndDeleteStore = async (id: string) => {
  try {
    return await Store.findByIdAndDelete(id);
    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};
