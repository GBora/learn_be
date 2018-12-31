"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const bodyParser = __importStar(require("body-parser"));
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
// Body parsing for forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.raw());
let port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}`);
});
exports.default = server;
//# sourceMappingURL=server.js.map