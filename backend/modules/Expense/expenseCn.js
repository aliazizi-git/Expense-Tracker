import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Expense from "./expenseMd.js";
import mongoose from "mongoose";

export const getAll = catchAsync(async (req, res, next) => {
  const condition = req.role == "user" ? { userId: req.userId } : {};
  const futures = new ApiFeatures(Expense, req.query, req.role)
    .addManualFilters(condition)
    .filter()
    .search(["title"])
    .limitFields()
    .sort()
    .paginate();
  const result = await futures.execute();
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res, next) => {
  const { title, description, category, cost, date } = req.body;
  const expense = await Expense.create({
    title,
    category,
    description,
    cost,
    date,
    userId: req.userId,
  });
  return res.status(201).json({
    success: true,
    message: "Expense created successfully",
    data: expense,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const condition =
    req.role == "user"
      ? { _id: req.params.id, userId: req.userId }
      : { _id: req.params.id };
  const updatedExpense = await Expense.findOneAndUpdate(
    condition,
    { $set: req.body },
    { new: true, runValidators: true },
  );
  if (!updatedExpense) {
    return next(new HandleERROR("Expense not found or access denied", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Expense updated successfully",
    data: updatedExpense,
  });
});
export const getSummary = catchAsync(async (req, res, next) => {
  const matchStage =
    req.role === "user"
      ? { userId: new mongoose.Types.ObjectId(req.userId) }
      : {};
  const { month, year } = req.query;
  if (month) {
    const targetMonth = parseInt(month);
    const targetYear = parseInt(year) || new Date().getFullYear();
    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 1);
    matchStage.date = { $gte: startDate, $lte: endDate };
  }
  const result = await Expense.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalCost: { $sum: "$cost" },
        count: { $sum: 1 },
      },
    },
  ]);
  const total = result.length > 0 ? result[0].totalCost : 0;
  const count = result.length > 0 ? result[0].count : 0;
  return res.status(200).json({
    success: true,
    data: {
      totalCost: total,
      totalCount: count,
      month: month ? parseInt(month) : "all",
      year: year ? parseInt(year) : month ? new Date().getFullYear() : "all",
    },
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const condition =
    req.role == "user"
      ? { _id: req.params.id, userId: req.userId }
      : { _id: req.params.id };
  const deletedExpense = await Expense.findOneAndDelete(condition);
  if (!deletedExpense) {
    return next(new HandleERROR("Expense not found or access denied", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Expense deleted successfully",
  });
});
