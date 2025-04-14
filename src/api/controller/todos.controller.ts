import { NextFunction, Request, Response } from "express";

import Todos from "../models/todos.model";

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
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
};

export const createTodos = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const updateTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.Id;
  const name = req.body.name;
  try {
    console.log(" in try section");
    const updatedTodos = await Todos.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );
    return res.send({ updatedTodos }) || "User not found.";
  } catch (err) {
    return res.send("Todo not found");
  }
};

export const deleteTodos = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const getTood_by_Id = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.todosId;

  Todos.findById(id)
    .exec()
    .then((docs: any) => {
      docs.name, id, res.status(200).json(docs);
    })
    .catch((err: Response) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
