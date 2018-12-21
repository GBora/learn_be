import express from "express";

export let router = express.Router();

router.get("/", (req, res) => {
    res.send("main page");
})

router.get("/all", (req, res) => {
    res.send("all");
})

