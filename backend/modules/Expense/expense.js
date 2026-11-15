import { Router } from "express";
import { getAll, create, getSummary, remove, update } from "./expenseCn.js";
import {
  createExpenseValidator,
  deleteExpenseValidator,
  summaryExpenseValidator,
  updateExpenseValidator,
} from "./expenseValidator.js";

const expenseRouter = Router();
expenseRouter.route("/").get(getAll).post(createExpenseValidator, create);
expenseRouter
  .route("/:id")
  .patch(updateExpenseValidator, update)
  .delete(deleteExpenseValidator, remove);
expenseRouter.route("/summary").get(summaryExpenseValidator, getSummary);


export default expenseRouter