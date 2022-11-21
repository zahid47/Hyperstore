import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getProductsBySlugController,
  getProductController,
  updateProductController,
} from "./product.controller";
import validate from "../../middlewares/validate";
import protect from "../../middlewares/protect";
import {
  createProductSchema,
  deleteProductSchema,
  getProductsBySlugSchema,
  getProductSchema,
  getProductsSchema,
  updateProductSchema,
} from "./product.schema";
import multer from "multer";
import fileFilter from "../../utils/fileFilter";

const router = Router();
const storage = multer.diskStorage({});
const upload = multer({ storage, fileFilter });

router
  .route("/slug")
  .get(validate(getProductsBySlugSchema), getProductsBySlugController);

router
  .route("/")
  .post(
    protect("admin"),
    upload.array("images"),
    validate(createProductSchema),
    createProductController
  )
  .get(validate(getProductsSchema), getProductsController);

router
  .route("/:id")
  .get(validate(getProductSchema), getProductController)
  .put(
    protect("admin"),
    upload.array("images"),
    validate(updateProductSchema),
    updateProductController
  )
  .delete(
    protect("admin"),
    validate(deleteProductSchema),
    deleteProductController
  );

export default router;
