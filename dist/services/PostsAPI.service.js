"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = require("../entities/post.model");
const sqlite3 = __importStar(require("sqlite3"));
class PostsAPIService {
    constructor() {
        this.db = null;
        this.openConnection();
    }
    openConnection() {
        this.db = new sqlite3.Database("data/blog.db", sqlite3.OPEN_READONLY, err => {
            if (err) {
                throw new Error(err.message);
            }
            console.log("connected to DB");
        });
    }
    closeConnection() {
        this.db.close(err => {
            if (err) {
                throw new Error(err.message);
            }
            console.log("Close the database connection.");
        });
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT ID,TITLE,IMAGE FROM POSTS ORDER BY ID DESC LIMIT 30", (err, rows) => {
                if (err) {
                    Promise.reject(err.message);
                }
                let postsList = [];
                rows.forEach(raw => {
                    postsList.push(new post_model_1.Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE));
                });
                resolve(postsList);
            });
        });
    }
    getSingle(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM POSTS WHERE ID = ${id}`, (err, rows) => {
                if (err) {
                    Promise.reject(err.message);
                }
                let post;
                rows.forEach(raw => {
                    post = new post_model_1.Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE);
                });
                resolve(post);
            });
        });
    }
    search(query) {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM POSTS', (err, rows) => {
                if (err) {
                    Promise.reject(err.message);
                }
                let postsList = [];
                rows.forEach(raw => {
                    if (raw.TITLE.indexOf(query.toUpperCase()) !== -1 ||
                        raw.BODY.indexOf(query.toUpperCase()) !== -1) {
                        postsList.push(new post_model_1.Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE));
                    }
                });
                resolve(postsList);
            });
        });
    }
}
exports.PostsAPIService = PostsAPIService;
//# sourceMappingURL=PostsAPI.service.js.map