import { Request, Response, NextFunction } from "express";
import {
  createStore,
  findStores,
  findAndDeleteStore,
  findAndUpdateStore,
  findStore,
} from "./store.service";
import { filterQueryBuilder } from "../../utils/filterQueryBuilder";
import log from "../../utils/logger";
import {
  createStoreInput,
  deleteStoreInput,
  getStoreInput,
  getStoresInput,
  updateStoreInput,
} from "./store.schema";
import createError from "../../utils/createError";
import { getRedis, setRedis } from "../../utils/redis";

export const createStoreController = async (
  req: Request<{}, {}, createStoreInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await createStore(req.body);
    return res.status(201).json(product);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "product", err.message));
  }
};

export const getStoreController = async (
  req: Request<getStoreInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const cachedStore = await getRedis(id);

    let product = null;

    if (cachedStore) {
      product = JSON.parse(cachedStore);
    } else {
      product = await findStore(id);
      await setRedis(id, JSON.stringify(product));
    }

    if (!product)
      return next(
        createError(
          404,
          "product",
          JSON.stringify({ details: "product not found" })
        )
      );
    return res.status(200).json(product);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "product", err));
  }
};

export const getStoresController = async (
  req: Request<{}, {}, {}, getStoresInput["query"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    let limit = 10; //default limit 10
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    let skip = 0; //default skip 0
    if (req.query.page) {
      skip = limit * (parseInt(req.query.page) - 1);
    }
    const query = filterQueryBuilder(req.query);
    const products = await findStores(query, limit, skip);
    return res.status(200).json(products);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "product", err));
  }
};

export const updateStoreController = async (
  req: Request<updateStoreInput["params"], {}, updateStoreInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await findAndUpdateStore(id, req.body);

    if (!product)
      return next(
        createError(
          404,
          "product",
          JSON.stringify({ details: "product not found" })
        )
      );

    return res.status(200).json(product);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "product", err));
  }
};

export const deleteStoreController = async (
  req: Request<deleteStoreInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await findAndDeleteStore(id);

    if (!product)
      return next(
        createError(
          404,
          "product",
          JSON.stringify({ details: "product not found" })
        )
      );

    return res.status(200).json({ success: true, message: "product deleted" });
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "product", err));
  }
};
