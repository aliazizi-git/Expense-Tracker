import { Router } from "express";
import { create, getAll, remove, update } from "./categoryCn.js";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} from "./categoryValidator.js";

const categoryRouter = Router();
categoryRouter.route("/").get(getAll).post(createCategoryValidator, create);
categoryRouter
  .route("/:id")
  .patch(updateCategoryValidator, update)
  .delete(deleteCategoryValidator, remove);


export default categoryRouter