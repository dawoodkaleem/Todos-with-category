"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const category_model_1 = __importDefault(require("../models/category.model"));
// interface updatedUser: {
//   id:string ,
//   name:string,
//   createdAt: string,
//   updatedAt: string,
//   __v: number
// }
router.get("/", (req, res, next) => {
    category_model_1.default.find()
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
router.post("/", (req, res, next) => {
    const category = new category_model_1.default({
        name: req.body.name,
    });
    category
        .save()
        .then((result) => {
        res.status(200).json({ message: "created succesfully", result });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.put("/:categoryId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.categoryId;
    const name = req.body.name;
    try {
        console.log(" in try section");
        const updatedUser = yield category_model_1.default.findByIdAndUpdate(id, { name }, {
            new: true,
        });
        console.log(" out  try section");
        return res.send({ updatedUser }) || "User not found.";
    }
    catch (err) {
        console.log("we are in catch in putCategory");
        return res.send("User not found");
    }
    // console.log(" this is where updatd name is checking]", req.body.name);
    // const id: string = req.params.categoryId;
    // console.log(id);
    // Category.findByIdAndUpdate(id, { name: req.body.name }, { new: true });
    // res.json({ message: "Updated sucessfully", id });
}));
router.get("/:categoryId", (req, res, next) => {
    const id = req.params.categoryId;
    category_model_1.default.findById(id)
        .exec()
        .then((docs) => {
        // console.log(docs)
        docs.name, id, res.status(200).json(docs);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.delete("/:categoryId", (req, res, next) => {
    const id = req.params.categoryId;
    // const name:string=req.params.name
    category_model_1.default.deleteOne({ _id: id })
        .exec()
        .then((result) => {
        res.status(200).json({
            message: `Product Deleted sucessfully ${id}`,
        });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
exports.default = router;
