"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostsAPI_service_1 = require("../services/PostsAPI.service");
exports.viewsRouter = express_1.default.Router();
let postsService = new PostsAPI_service_1.PostsAPIService();
exports.viewsRouter.get("/", (req, res) => {
    res.send("main page");
});
exports.viewsRouter.get("/all", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let allPosts = yield postsService.getAll();
        res.render("./pages/all", { posts: allPosts });
    }
    catch (e) {
        console.log("Error", e);
        res.sendStatus(500);
    }
}));
exports.viewsRouter.get("/single/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let post = yield postsService.getSingle(req.params["id"]);
        res.render("./pages/single", { post: post });
    }
    catch (e) {
        console.log("Error", e);
        res.sendStatus(500);
    }
}));
exports.viewsRouter.get("/search", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let posts = yield postsService.search(req.query.search);
        res.render("./pages/search", { posts: posts });
    }
    catch (e) {
        console.log("Error", e);
        res.sendStatus(500);
    }
}));
//# sourceMappingURL=router_views.js.map