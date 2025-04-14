import { NextFunction, Request, Response } from "express";
import express from "express";
const router = express.Router();

import SubCategory from "../models/subcatogry";

export const getSubcategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SubCategory.find()
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
};

export const createSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const subCategory = new SubCategory({
      name: req.body.name,
      categoryId: req.body.categoryId || "Dummy Monggose",
    });

    console.log("subCategory", subCategory);

    const save = await subCategory.save();
    res
      .status(200)
      .json({ message: " created subcategory Inside the SubCategory", save });
  } catch (error) {
    res.status(500).json({ message: "Subcategory not found " });
    console.log(error);
  }
};

export const updateSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.Id;
  const name = req.body.name;
  try {
    console.log(" in try section");
    const updatedUser = await SubCategory.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );
    console.log("out  try section");
    return res.send({ updatedUser }) || "User not found.";
  } catch (err) {
    console.log("we are in catch in putCategory");
    return res.send("User not found");
  }
};

export const deleteSubcategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.subcategoryId;
  // const name:string=req.params.name
  SubCategory.deleteOne({ _id: id })
    .exec()
    .then((): void => {
      res.status(200).json({
        message: `SubCategory Deleted sucessfully ${id}`,
      });
    })
    .catch((err: unknown): void => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};
