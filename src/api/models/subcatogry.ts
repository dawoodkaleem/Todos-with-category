import mongoose from "mongoose";

export interface ISubCategory {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
const subCategorySchema = new mongoose.Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<ISubCategory>("SubCategory", subCategorySchema);
