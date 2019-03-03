export interface WeatherResponse {
    outputs: {
        data: {
            weather: [
                {
                    id: string
                }
            ],

            main: {
                temp: number
            }
        }
    }[]
}
