import { object, string, TypeOf } from "zod";

export const createStoreSchema = object({
  body: object({
    name: string({ required_error: "store name is required" }),
    description: string().optional(),
    logo: string().optional(),
    primaryColor: string().optional(),
  }),
});

export const getStoresSchema = object({
  query: object({
    limit: string().optional(),
    page: string().optional(),
  }),
});

export const getStoreSchema = object({
  params: object({
    id: string(),
  }),
});

export const updateStoreSchema = object({
  params: object({
    id: string({ required_error: "store id is required" }),
  }),
  body: object({
    name: string().optional(),
    description: string().optional(),
    logo: string().optional(),
    primaryColor: string().optional(),
  }),
});

export const deleteStoreSchema = object({
  params: object({
    id: string({ required_error: "store id is required" }),
  }),
});

export type createStoreInput = TypeOf<typeof createStoreSchema>;
export type getStoresInput = TypeOf<typeof getStoresSchema>;
export type getStoreInput = TypeOf<typeof getStoreSchema>;
export type updateStoreInput = TypeOf<typeof updateStoreSchema>;
export type deleteStoreInput = TypeOf<typeof deleteStoreSchema>;
