import { generateId } from "../utils/GenerateId.js";

export class Weather {
    constructor(data) {
        this.name = data.name;
        this.tempCelsius = data.main && data.main.temp; // Store temperature in Celsius
    }

    get tempFahrenheit() {
        return (this.tempCelsius * 9 / 5) + 32; // Convert to Fahrenheit
    }
}
