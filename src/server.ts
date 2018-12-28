import express from "express";
import "reflect-metadata";
import { router } from "./router/router";
import { viewsRouter } from "./router/router_views";

const app = express();

app.set("view engine", "ejs");
// API
app.use(router);
// Views
app.use("/views",viewsRouter);
// Static files
app.use(express.static('public'));

let port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}`);
});

export default server;