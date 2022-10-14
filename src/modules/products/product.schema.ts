import { array, boolean, number, object, string, TypeOf } from "zod";

export const createProductSchema = object({
  body: object({
    name: string({ required_error: "product name is required" }),
    description: string().optional(),
    storeId: string({ required_error: "storeId is required" }),
    images: array(string().url("Image must be an URL")).optional(),
    prices: array(
      object(
        {
          price: number({ required_error: "price value is required" }),
          option: string({ required_error: "option text is required" }),
        },
        { required_error: "price information is required" }
      )
    ),
  }),
});

export const getProductsSchema = object({
  query: object({
    limit: string().optional(),
    page: string().optional(),
    searchTerm: string().optional(),
  }),
});

export const getProductSchema = object({
  params: object({
    id: string(),
  }),
});

export const updateProductSchema = object({
  params: object({
    id: string({ required_error: "product id is required" }),
  }),
  body: object({
    name: string().optional(),
    description: string().optional(),
    images: string().url("Image must be an URL").optional(),
    prices: array(
      object({
        price: number({ required_error: "price value is required" }),
        option: string({ required_error: "option text is required" }),
      })
    ).optional(),
  }),
});

export const deleteProductSchema = object({
  params: object({
    id: string({ required_error: "product id is required" }),
  }),
});

export type createProductInput = TypeOf<typeof createProductSchema>;
export type getProductsInput = TypeOf<typeof getProductsSchema>;
export type getProductInput = TypeOf<typeof getProductSchema>;
export type updateProductInput = TypeOf<typeof updateProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
