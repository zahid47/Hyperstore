import { Router } from "express";
import { getOrdersByUserController } from "../orders/order.controller";
import {
  createUserController,
  updateUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  verifyEmailController,
  sendVerificationEmailController,
} from "./user.controller";
import protect from "../../middlewares/protect";
import validate from "../../middlewares/validate";
import { getOrdersSchema } from "../orders/order.schema";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  getUsersSchema,
  sendVerificationEmailSchema,
  updateUserSchema,
  verifyEmailSchema,
} from "./user.schema";

const router = Router();

router
  .route("/")
  .post(validate(createUserSchema), createUserController)
  .get(protect("admin"), validate(getUsersSchema), getUsersController);

router
  .route("/orders")
  .get(protect("user"), validate(getOrdersSchema), getOrdersByUserController);

router
  .route("/verify/email/:code")
  .get(validate(verifyEmailSchema), verifyEmailController);
router
  .route("/verify/email")
  .get(validate(sendVerificationEmailSchema), sendVerificationEmailController);

router
  .route("/:id")
  .get(protect("admin"), validate(getUserSchema), getUserController)
  .put(protect("user"), validate(updateUserSchema), updateUserController)
  .delete(protect("user"), validate(deleteUserSchema), deleteUserController);

export default router;
