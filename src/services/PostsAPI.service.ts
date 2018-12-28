import { PostsAPIInterface } from './PostsAPI.interface';
import { Post } from '../entities/post.model';
import * as sqlite3 from "sqlite3";

export class PostsAPIService implements PostsAPIInterface {
	constructor() {}
	
	getAll(): Promise<Post[]> {
		return new Promise((resolve, reject) => { 
			//TODO this is an path that only works from within the root, replace it 
			//with an absolute path
			let db = new sqlite3.Database("data/blog.db", sqlite3.OPEN_READONLY, (err) => {
				if (err) {
					throw new Error(err.message);
				}

				console.log("connected to DB");
			});

			db.all("SELECT * FROM POSTS", (err, rows) => {
				if (err) {
					Promise.reject(err.message);
				}

				let postsList: Post[] = [];
				rows.forEach((raw) => {
					postsList.push(new Post(raw.ID, raw.TITLE, raw.BODY, raw.IMAGE));
				})

				resolve(postsList);
			})

			db.close((err) => {
				if (err) {
					throw new Error(err.message);
				}
				console.log('Close the database connection.');
			});
		});
	}
}