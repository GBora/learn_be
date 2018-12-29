import { PostsAPIInterface } from "./PostsAPI.interface";
import { Post } from "../entities/post.model";
import * as sqlite3 from "sqlite3";

export class PostsAPIService implements PostsAPIInterface {

  constructor() {}

  getAll(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      //TODO this is an path that only works from within the root, replace it
      //with an absolute path
      let db = new sqlite3.Database(
        "data/blog.db",
        sqlite3.OPEN_READONLY,
        err => {
          if (err) {
            throw new Error(err.message);
          }

          console.log("connected to DB");
        }
      );

      db.all(
        "SELECT ID,TITLE,IMAGE FROM POSTS ORDER BY ID DESC LIMIT 30",
        (err, rows) => {
          if (err) {
            Promise.reject(err.message);
          }

          let postsList: Post[] = [];
          rows.forEach(raw => {
            postsList.push(
              new Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE)
            );
          });

          resolve(postsList);
        }
      );

      db.close(err => {
        if (err) {
          throw new Error(err.message);
        }
        console.log("Close the database connection.");
      });
    });
  }

  getSingle(id: number): Promise<Post> {
    return new Promise((resolve, reject) => {
      //TODO this is an path that only works from within the root, replace it
      //with an absolute path
      let db = new sqlite3.Database(
        "data/blog.db",
        sqlite3.OPEN_READONLY,
        err => {
          if (err) {
            throw new Error(err.message);
          }

          console.log("connected to DB");
        }
      );

      db.all(`SELECT * FROM POSTS WHERE ID = ${id}`, (err, rows) => {
        if (err) {
          Promise.reject(err.message);
        }

        let post: Post;
        rows.forEach(raw => {
          post = new Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE);
        });

        resolve(post);
      });

      db.close(err => {
        if (err) {
          throw new Error(err.message);
        }
        console.log("Close the database connection.");
      });
    });
  }

  search(query: string): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
}
