import { quoteService } from "../services/QuoteService.js";
import { AppState } from "../AppState.js";

export class QuoteController {
    constructor() {
        this.getQuote()
        AppState.on('quote', () => this.displayQuote())
    }

    async getQuote() {
        await quoteService.getQuote()
    }

    displayQuote() {
        const quoteElement = document.getElementById('quote-box')
        if (AppState.quote) {
            quoteElement.innerHTML = `
                <p class="quote-text">${AppState.quote.body}</p>
                <p class="quote-author">${AppState.quote.author}</p>
            `
        }
    }
}