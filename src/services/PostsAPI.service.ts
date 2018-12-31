import { PostsAPIInterface } from "./PostsAPI.interface";
import { Post } from "../entities/post.model";
import * as sqlite3 from "sqlite3";

export class PostsAPIService implements PostsAPIInterface {
  private db: sqlite3.Database = null;

  constructor() {
    this.openConnection();
  }

  openConnection() {
    this.db = new sqlite3.Database(
      "data/blog.db",
      sqlite3.OPEN_READONLY,
      err => {
        if (err) {
          throw new Error(err.message);
        }

        console.log("connected to DB");
      }
    );
  }

  closeConnection() {
    this.db.close(err => {
      if (err) {
        throw new Error(err.message);
      }
      console.log("Close the database connection.");
    });
  }

  getAll(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT ID,TITLE,IMAGE FROM POSTS ORDER BY ID DESC LIMIT 30",
        (err, rows) => {
          if (err) {
            Promise.reject(err.message);
          }

          let postsList: Post[] = [];
          rows.forEach(raw => {
            postsList.push(new Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE));
          });

          resolve(postsList);
        }
      );
    });
  }

  getSingle(id: number): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM POSTS WHERE ID = ${id}`, (err, rows) => {
        if (err) {
          Promise.reject(err.message);
        }

        let post: Post;
        rows.forEach(raw => {
          post = new Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE);
        });

        resolve(post);
      });
    });
  }

  search(query: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM POSTS',
        (err, rows) => {
          if (err) {
            Promise.reject(err.message);
          }

          let postsList: Post[] = [];
          rows.forEach(raw => {
            if ((<string>raw.TITLE).indexOf(query.toUpperCase()) !== -1 || 
                (<string>raw.BODY).indexOf(query.toUpperCase()) !== -1) {
              postsList.push(
                new Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE)
              );
            }
          });

          resolve(postsList);
        }
      );
    });
  }
}
