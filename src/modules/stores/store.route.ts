import { Router } from "express";
import {
  createStoreController,
  deleteStoreController,
  getStoresController,
  getStoreController,
  updateStoreController,
} from "./store.controller";
import validate from "../../middlewares/validate";
import protect from "../../middlewares/protect";
import {
  createStoreSchema,
  deleteStoreSchema,
  getStoreSchema,
  getStoresSchema,
  updateStoreSchema,
} from "./store.schema";
import multer from "multer";
import fileFilter from "../../utils/fileFilter";

const router = Router();
const storage = multer.diskStorage({});
const upload = multer({ storage, fileFilter });

router
  .route("/")
  .post(
    protect("admin"),
    upload.array("images"),
    validate(createStoreSchema),
    createStoreController
  )
  .get(validate(getStoresSchema), getStoresController);

router
  .route("/:id")
  .get(validate(getStoreSchema), getStoreController)
  .put(
    protect("admin"),
    upload.array("images"),
    validate(updateStoreSchema),
    updateStoreController
  )
  .delete(
    protect("admin"),
    validate(deleteStoreSchema),
    deleteStoreController
  );

export default router;
