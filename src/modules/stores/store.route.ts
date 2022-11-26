import { Router } from "express";
import {
  createStoreController,
  deleteStoreController,
  getStoresController,
  getStoreController,
  updateStoreController,
  uploadFileController,
  getStoreBySlugController,
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

router.route("/upload").post(upload.single("file"), uploadFileController);
router.route("/slug/:store_slug").get(getStoreBySlugController);

router
  .route("/:id")
  .get(validate(getStoreSchema), getStoreController)
  .put(protect("user"), validate(updateStoreSchema), updateStoreController)
  .delete(protect("user"), validate(deleteStoreSchema), deleteStoreController);

router
  .route("/")
  .post(protect("user"), validate(createStoreSchema), createStoreController)
  .get(validate(getStoresSchema), getStoresController);

export default router;
