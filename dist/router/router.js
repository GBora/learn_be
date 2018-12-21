"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    res.send("main page");
});
exports.router.get("/all", (req, res) => {
    res.send("all");
});
//# sourceMappingURL=router.js.map