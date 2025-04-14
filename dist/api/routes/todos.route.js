"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const todos_model_1 = __importDefault(require("../models/todos.model"));
// import mongoose from "mongoose";
router.post("/", (req, res, next) => {
    console.log(req.body.type);
    const todo = new todos_model_1.default({
        name: req.body.name,
        type: req.body.type,
    });
    todo
        .save()
        .then((result) => {
        res.status(200).json({ message: "created succesfully", result });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.get("/", (req, res, next) => {
    todos_model_1.default.find()
        .exec()
        .then((docs) => {
        console.log(docs);
        const response = {
            count: docs.length,
            product: docs.map((doc) => {
                return {
                    name: doc.name,
                    _id: doc._id,
                };
            }),
        };
        res.status(200).json(response);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.put("/:Id", (req, res, next) => {
    const id = req.params.Id;
    console.log(req.body.name);
    todos_model_1.default.findByIdAndUpdate(req.params.Id, { name: req.body.name }, { new: true });
    res.json({ message: "Updated Todos sucessfully", id });
});
router.delete("/:todosId", (req, res, next) => {
    const id = req.params.todosId;
    // const name:string=req.params.name
    todos_model_1.default.deleteOne({ _id: id })
        .exec()
        .then(() => {
        res.status(200).json({
            message: `Todos Deleted sucessfully ${id}`,
        });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
exports.default = router;
