import { Post } from '../entities/post.model';
import express from 'express';
import { PostsAPIService } from '../services/PostsAPI.service';

export let viewsRouter = express.Router();
let postsService: PostsAPIService = new PostsAPIService();

viewsRouter.get("/", (req, res) => {
    res.send("main page");
})

viewsRouter.get("/all", async (req, res) => {
    try {
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
        let post: Post = await postsService.getSingle(req.params["id"]);
        res.render("./pages/single", {post: post});
    }

    catch (e) {
        console.log("Error", e);
        res.sendStatus(500);
    }
})

viewsRouter.get("/search", async (req, res) => {
    try {
      let posts: Post[] = await postsService.search(req.query.search);
      res.render("./pages/search", { posts: posts });
    }
    
    catch (e) {
      console.log("Error", e);
      res.sendStatus(500);
    }
})

