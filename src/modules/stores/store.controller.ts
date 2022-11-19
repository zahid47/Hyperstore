import { Request, Response, NextFunction, request, response } from "express";
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
import { getCloudinaryURL } from "../../utils/cloudinary";

export const uploadFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    if (!file) {
      return next(createError(400, "File not found"));
    }
    const url = await getCloudinaryURL(file);
    return res.status(200).json({ url });
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "upload", err.message));
  }
};

export const createStoreController = async (
  req: Request<{}, {}, createStoreInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await createStore(req.body);
    return res.status(201).json(store);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "store", err.message));
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

    let store = null;

    if (cachedStore) {
      store = JSON.parse(cachedStore);
    } else {
      store = await findStore(id);
      await setRedis(id, JSON.stringify(store));
    }

    if (!store)
      return next(
        createError(
          404,
          "store",
          JSON.stringify({ details: "store not found" })
        )
      );
    return res.status(200).json(store);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "store", err));
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
    const stores = await findStores(query, limit, skip);
    return res.status(200).json(stores);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "store", err));
  }
};

export const updateStoreController = async (
  req: Request<updateStoreInput["params"], {}, updateStoreInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const store = await findAndUpdateStore(id, req.body);

    if (!store)
      return next(
        createError(
          404,
          "store",
          JSON.stringify({ details: "store not found" })
        )
      );

    return res.status(200).json(store);
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "store", err));
  }
};

export const deleteStoreController = async (
  req: Request<deleteStoreInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const store = await findAndDeleteStore(id);

    if (!store)
      return next(
        createError(
          404,
          "store",
          JSON.stringify({ details: "store not found" })
        )
      );

    return res.status(200).json({ success: true, message: "store deleted" });
  } catch (err: any) {
    log.error(err);
    return next(createError(err.status, "store", err));
  }
};
