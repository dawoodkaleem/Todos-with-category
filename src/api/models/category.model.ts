const mongoose = require("mongoose");

import { Document, Schema as SchemaType, Model } from "mongoose";

interface ICategory {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new SchemaType(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
// export default
