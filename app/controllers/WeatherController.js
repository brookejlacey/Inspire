import { weatherService } from "../services/WeatherService.js"
import { AppState } from "../AppState.js"

export class WeatherController {
    constructor() {
        this.useFahrenheit = false
        this.getWeather()
        AppState.on('weather', () => this.displayWeather())
    }

    async getWeather() {
        await weatherService.getWeather()
    }

    displayWeather() {
        const weatherElement = document.getElementById('weather')
        if (AppState.weather) {
            const tempUnit = this.useFahrenheit ? '°F' : '°C'
            const tempValue = this.useFahrenheit
                ? AppState.weather.tempFahrenheit.toFixed(1)
                : AppState.weather.tempCelsius.toFixed(1)

            weatherElement.innerHTML = `
          <p>${AppState.weather.name}</p>
          <p id="temperature" style="cursor:pointer;">${tempValue}${tempUnit}</p>
          <p>${AppState.weather.description}</p>
        `

            //clicking listener to change it 
            document.getElementById('temperature').addEventListener('click', () => {
                this.useFahrenheit = !this.useFahrenheit
                this.displayWeather()
            });
        }
    }
}
