import { Post } from "../entities/post.model";

export interface PostsAPIInterface {
	getAll(): Promise<Post[]>;
}