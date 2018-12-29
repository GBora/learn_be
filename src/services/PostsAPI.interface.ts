import { Post } from "../entities/post.model";

export interface PostsAPIInterface {
  getAll(): Promise<Post[]>;
  getSingle(id: number): Promise<Post>;
  search(query: string): Promise<Post[]>;
}