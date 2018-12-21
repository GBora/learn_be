import express from "express";
import "reflect-metadata";
import { router } from "./router/router";

const app = express();

app.use(router);

const server = app.listen(3000, () => {
    console.log("listening on port 3000");
});

export default server;