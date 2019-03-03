import { WeatherType } from '../models/weather_type'
import axios, { AxiosRequestConfig } from 'axios'
import { WeatherResponse } from '../models/weather_response';

export class Weather {
    private currentWeatherUrl : string = 'https://api.openweathermap.org/data/2.5/weather'
    private apiKey: string
    private coldThresh: number

    constructor(coldThresh: number) {
        this.apiKey = process.env.OPENWEATHER_API_KEY
        this.coldThresh = coldThresh
    }

    async getWeather(zip: string): Promise<WeatherType[]> {
        let resp = await axios.get<WeatherResponse>(this.currentWeatherUrl, {
            params: {
                "zip": zip,
                "units": "imperial",
                "appid": this.apiKey
            }
        })

        const specialWeather = resp.data.weather

        let weather: WeatherType[] = []

        for (let special in specialWeather) {
            if(special[0] === '5') {
                weather.push(WeatherType.RAINY);
            }
        }

        const mainWeather = resp.data.main

        if (mainWeather.temp < this.coldThresh) {
            weather.push(WeatherType.COLD)
        } else {
            weather.push(WeatherType.HOT)
        }

        return weather
    }
}
