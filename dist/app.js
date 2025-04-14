"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const subcategory_route_1 = __importDefault(require("./api/routes/subcategory.route"));
const category_route_1 = __importDefault(require("./api/routes/category.route"));
const todos_route_1 = __importDefault(require("./api/routes/todos.route"));
mongoose_1.default
    .connect("mongodb+srv://dawood9743:task123@tasknew.tbatzag.mongodb.net/?retryWrites=true&w=majority&appName=Tasknew")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌MongoDB Connection Failed:", err));
//Middle wares
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/category", category_route_1.default);
app.use("/subcategory", subcategory_route_1.default);
app.use("/todos", todos_route_1.default);
// app.use("/subcategory", subcategoryRouter);
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.name = "404";
    next(error);
});
app.use((req, res, next) => {
    res.status(200).json({ message: "It worked" });
});
exports.default = app;
