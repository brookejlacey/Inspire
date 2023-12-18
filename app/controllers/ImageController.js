
import { imageService } from "../services/ImageService.js"
import { AppState } from "../AppState.js"

export class ImageController {
    constructor() {
        this.getImage()
        AppState.on('image', () => this.displayImage())
    }

    async getImage() {
        await imageService.getImage()
    }

    displayImage() {

        const backgroundImageElement = document.getElementById('background-image')
        if (AppState.image) {
            console.log(`Setting background image URL: ${AppState.image.largeImgUrl}`)
            backgroundImageElement.style.backgroundImage = `url('${AppState.image.largeImgUrl}')`
            console.log('Image displayed');
        } else {
            console.log('no image available');
        }
    }
}
