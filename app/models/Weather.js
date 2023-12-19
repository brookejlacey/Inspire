import { generateId } from "../utils/GenerateId.js";

export class Weather {
    constructor(data) {
        //FIXME the weather temp is quite high, the temp coming in is measured in kelvin
        this.name = data.name;
        this.tempCelsius = data.main && data.main.temp; // Store temperature in Celsius
    }

    get tempFahrenheit() {
        return (this.tempCelsius * 9 / 5) + 32; // Convert to Fahrenheit
    }
}
