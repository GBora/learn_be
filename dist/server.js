"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const router_1 = require("./router/router");
const app = express_1.default();
app.use(router_1.router);
const server = app.listen(3000, () => {
    console.log("listening on port 3000");
});
exports.default = server;
//# sourceMappingURL=server.js.map