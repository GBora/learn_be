export class Post {
	public ID: number;
	public TITLE: string;
	public BODY: string;
	public IMAGE: any;

	public constructor(id: number, title: string = "", body: string = "", image: any = null) {
		this.ID = id;
		this.TITLE = title;
		this.BODY = body;
		this.IMAGE =  image;
	}
}