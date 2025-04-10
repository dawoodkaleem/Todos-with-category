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

//Complete api in app.ts start here for subcategory

// Subcategory routes  end here

// ||||||||||||||||||||||||||||||
/////////////////__________________||||||||
// Routing start for categoryRouter

// routing ends for Category
// ///////////////////___________-//////////////
///////////////////////////////////////////////
// Routing start for TodosStart here

app.post("/todos", (req: Request, res: Response, next: NextFunction): void => {
  console.log(req.body.type);
  const todo = new Todos({
    name: req.body.name,
    type: req.body.type,
  });
  todo
    .save()
    .then((result: unknown): void => {
      res.status(200).json({ message: "created succesfully", result });
    })
    .catch((err: unknown): void => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.get("/todos", (req: Request, res: Response, next: NextFunction) => {
  Todos.find()
    .exec()
    .then((docs: any): void => {
      console.log(docs);
      const response = {
        count: docs.length,
        product: docs.map((doc: result) => {
          return {
            name: doc.name,
            _id: doc._id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
app.put("/todos/:Id", (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.Id;
  console.log(req.body.name);
  Todos.findByIdAndUpdate(
    req.params.Id,
    { name: req.body.name },
    { new: true }
  );
  res.json({ message: "Updated Todos sucessfully", id });
});

app.delete(
  "/todos/:todosId",
  (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.todosId;
    // const name:string=req.params.name
    Todos.deleteOne({ _id: id })
      .exec()
      .then(() => {
        res.status(200).json({
          message: `Todos Deleted sucessfully ${id}`,
        });
      })
      .catch((err: unknown): void => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

// Routing ends here for Todos here

// Routing start here

app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
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
