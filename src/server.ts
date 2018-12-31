import express from "express";
import "reflect-metadata";
import * as bodyParser from 'body-parser';
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
// Body parsing for forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.raw());

let port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}`);
});

export default server;