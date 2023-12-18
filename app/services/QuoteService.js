import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";
import { Quote } from "../models/Quote.js";

class QuoteService {
    async getQuote() {
        try {
            const res = await api.get('api/quotes')
            console.log("API response for quote:", res.data)
            AppState.quote = new Quote(res.data)
            AppState.emit('quote', AppState.quote)
        } catch (error) {
            console.error('Unable to get quote:', error);
        }
    }
}

export const quoteService = new QuoteService()