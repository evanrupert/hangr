import { WeatherType } from '../models/weather_type'
import axios, { AxiosRequestConfig } from 'axios'
import { WeatherResponse } from '../models/weather_response';

export class Weather {
    private currentWeatherUrl : string = '/data/2.5/weather'
    private apiKey: string
    private coldThresh: number
    private hotThresh: number

    constructor(coldThresh: number, hotThresh: number) {
        this.apiKey = process.env.OPENWEATHER_API_KEY
        this.coldThresh = coldThresh
        this.hotThresh = hotThresh
    }

    async getWeather(city: string): Promise<WeatherType[]> {
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': `Key ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        }

        let resp = await axios.post<WeatherResponse>(this.currentWeatherUrl,
                                                     {
            inputs: [
                {
                    data: {
                        "city": city,
                        "units": "imperial"
                    }
                }
            ]
        }, config)

        const specialWeather = resp.data.outputs[0].data.weather

        let weather: WeatherType[]

        for (let special in specialWeather) {
            if(special[0] == '5') {
                weather.push(WeatherType.RAINY);
            }
        }

        const mainWeather = resp.data.outputs[0].data.main

        if (mainWeather.temp < this.coldThresh) {
            weather.push(WeatherType.COLD)
        } else if (mainWeather.temp < this.hotThresh) {
            weather.push(WeatherType.HOT)
        }

        return weather
    }
}
