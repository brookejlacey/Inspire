import { generateId } from "../utils/GenerateId.js";

export class Quote {
    constructor(data) {
        console.log("Data received in Quote model:", data);
        this.body = data.content;
        this.author = data.author;
        this.tags = data.tags;
        this.description = data.description;
    }
}
