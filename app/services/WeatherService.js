import { api } from "./AxiosService.js";
import { AppState } from "../AppState.js";
import { Weather } from "../models/Weather.js";


class WeatherService {
    async getWeather() {
        try {
            const res = await api.get('api/weather')
            AppState.weather = new Weather(res.data)
            AppState.emit('weather', AppState.weather)
        } catch (error) {
            console.error('Unable to get weather:', error);
        }
    }
}
export const weatherService = new WeatherService()

