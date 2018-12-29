import { Post } from '../entities/post.model';
import express from 'express';
import { PostsAPIService } from '../services/PostsAPI.service';

export let viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
    res.send("main page");
})

viewsRouter.get("/all", async (req, res) => {
    try {
        let postsService: PostsAPIService = new PostsAPIService();
        let allPosts: Post[] = await postsService.getAll();
        res.render("./pages/all", {posts: allPosts});
    }

    catch(e) {
        console.log("Error",e);
        res.sendStatus(500);
    }
})

viewsRouter.get("/single/:id", async (req, res) => {
    try {
        let postsService: PostsAPIService = new PostsAPIService();
        let post: Post = await postsService.getSingle(req.params["id"]);
        res.render("./pages/single", {post: post});
    }

    catch (e) {
        console.log("Error", e);
        res.sendStatus(500);
    }
})

