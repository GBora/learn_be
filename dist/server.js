"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const router_1 = require("./router/router");
const router_views_1 = require("./router/router_views");
const app = express_1.default();
app.set("view engine", "ejs");
// API
app.use(router_1.router);
// Views
app.use("/views", router_views_1.viewsRouter);
// Static files
app.use(express_1.default.static('public'));
let port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}`);
});
exports.default = server;
//# sourceMappingURL=server.js.map