import { NextFunction, Request, Response } from "express";

import express from "express";
import mongoose from "mongoose";
const app = express();

// import Category from "./api/models/category.model";
// const subcategoryRouter = require("./api/routes/subcategory");
import SubCategory from "./api/models/subcatogry";
import subcategoryRouter from "./api/routes/subcategory.route";
import Todos from "./api/models/todos.model";
import categoryRouter from "./api/routes/category.route";
import todosRoute from "./api/routes/todos.route";
mongoose
  .connect(
    "mongodb+srv://dawood9743:task123@tasknew.tbatzag.mongodb.net/?retryWrites=true&w=majority&appName=Tasknew"
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err: string) => console.error("❌MongoDB Connection Failed:", err));

interface result {
  name: string;
  _id: string;
  count?: number;
  response?: {};
}

//Middle wares
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/todos", todosRoute);
// app.use("/subcategory", subcategoryRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  error.name = "404";
  next(error);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "It worked" });
});

export default app;
