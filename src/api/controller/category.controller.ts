import { NextFunction, Request, Response } from "express";

import express from "express";

const router = express.Router();
import Category from "../models/category.model";

interface result {
  name: string;
  _id: string;
  count?: number;
  response?: {};
}

export const getCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Category.find()
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
};

export const createCategory = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const category = new Category({
    name: req.body.name,
  });
  category
    .save()
    .then((result: string): void => {
      res.status(200).json({ message: "created succesfully", result });
    })
    .catch((err: unknown): void => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const getCategory_by_id = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.categoryId;

  Category.findById(id)
    .exec()
    .then((docs: result): void => {
      // console.log(docs)
      docs.name, id, res.status(200).json(docs);
    })
    .catch((err: Response) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.categoryId;
  const name: string = req.body.name;
  try {
    const updatedUser = await Category.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );

    return res.send({ updatedUser }) || "User not found.";
  } catch (err) {
    console.log("we are in catch in putCategory");
    return res.send("User not found");
  }
};

export const deleteCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.categoryId;
  // const name:string=req.params.name
  Category.deleteOne({ _id: id })
    .exec()
    .then((result: Response) => {
      res.status(200).json({
        message: `Product Deleted sucessfully ${id}`,
      });
    })
    .catch((err: unknown): void => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
