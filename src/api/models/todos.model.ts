import mongoose from "mongoose";

export interface ITodo {
  name: String;
  type: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const todoSchema = new mongoose.Schema<ITodo>(
  {
    name: { type: String, required: true },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", todoSchema);
