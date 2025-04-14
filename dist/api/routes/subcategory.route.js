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
const subcatogry_1 = __importDefault(require("../models/subcatogry"));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategory = new subcatogry_1.default({
            name: req.body.name,
            categoryId: req.body.categoryId || "Dummy Monggose",
        });
        console.log("subCategory", subCategory);
        const save = yield subCategory.save();
        res
            .status(200)
            .json({ message: " created subcategory Inside the SubCategory", save });
    }
    catch (error) {
        res.status(500).json({ message: "Subcategory not found " });
        console.log(error);
    }
}));
router.get("/", (req, res, next) => {
    subcatogry_1.default.find()
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
router.put("/:Id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.Id;
    const name = req.body.name;
    try {
        console.log(" in try section");
        const updatedUser = yield subcatogry_1.default.findByIdAndUpdate(id, { name }, {
            new: true,
        });
        console.log("out  try section");
        return res.send({ updatedUser }) || "User not found.";
    }
    catch (err) {
        console.log("we are in catch in putCategory");
        return res.send("User not found");
    }
}));
router.delete("/:subcategoryId", (req, res, next) => {
    const id = req.params.subcategoryId;
    // const name:string=req.params.name
    subcatogry_1.default.deleteOne({ _id: id })
        .exec()
        .then(() => {
        res.status(200).json({
            message: `SubCategory Deleted sucessfully ${id}`,
        });
    })
        .catch((err) => {
        // console.log(err);
        res.status(500).json({ error: err });
    });
});
exports.default = router;
