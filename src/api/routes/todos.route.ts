import { NextFunction, Request, Response } from "express";

import express from "express";

const router = express.Router();
import Todos from "../models/todos.model";
// import mongoose from "mongoose";

router.post("/", (req: Request, res: Response, next: NextFunction) => {
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

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Todos.find()
    .exec()
    .then((docs: any): void => {
      console.log(docs);
      const response = {
        count: docs.length,
        product: docs.map((doc: any) => {
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
router.put("/:Id", (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.Id;

  Todos.findByIdAndUpdate(
    req.params.Id,
    { name: req.body.name },
    { new: true }
  );
  res.json({ message: "Updated Todos sucessfully", id });
});

router.delete(
  "/:todosId",
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

export default router;
