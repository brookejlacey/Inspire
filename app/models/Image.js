import { generateId } from "../utils/GenerateId.js";

export class Image {
    constructor(data) {
        this.url = data.url
        this.imgUrl = data.imageUrl
        this.largeImgUrl = data.largeImgUrl
        this.tags = data.tags
        this.author = data.author
        this.query = data.query
    }
}