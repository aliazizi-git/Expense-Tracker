import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Category from "./categoryMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const condition = req.role == "user" ? { userId: req.userId } : {};
  const futures = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(condition)
    .filter()
    .search(["name"])
    .limitFields()
    .sort()
    .paginate();
  const result = await futures.execute();
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res, next) => {
  const { name, color, icon } = req.body;
  const isExist = await Category.findOne({ name, userId: req.userId });
  if (isExist) {
    return next(new HandleERROR("Category already exist"));
  }
  const category = await Category.create({
    name,
    color,
    icon,
    userId: req.userId,
  });
  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});
export const update = catchAsync(async(req,res,next)=>{
    const condition = req.role=="user"
    ? {_id:req.params.id,userId:req.userId}
    : {_id:req.params.id}
    const updatedCategory = await Category.findOneAndUpdate(
        condition,
        {$set:req.body},
        {new:true,runValidators:true}
    
    )
    if(!updatedCategory){
        return next(new HandleERROR("Category not found or access denied",404))
    }
    return res.status(201).json({
        success:true,
        message:"Category updated successfully",
        data:updatedCategory
    })
})
export const remove = catchAsync(async (req, res, next) => {
  const condition =
    req.role == "user"
      ? { _id: req.params.id, userId: req.userId }
      : { _id: req.params.id };

    const deletedCategory = await Category.findOneAndDelete(condition)
    if(!deletedCategory){
        return next (new HandleERROR("Category not found or access denied",404))
    }
    return res.status(200).json({
        success:true,
        message:"Category deleted successfully"
    })
});
