import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Database } from '../lib/services/database'
import { Weather } from '../lib/services/weather'
import { WeatherType } from '../lib/models/weather_type'
import { Item } from '../lib/entities/item'

const WEATHER_BONUS : number = 2.0
const STALL_MULTIPLIER : number = 0.1
const HISTORY_MULTIPLIER : number = 0.5

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const weatherService = new Weather(60)
    const currentWeather : WeatherType[] = await weatherService.getWeather('32816,us')

    const db = new Database()
    await db.initialize()

    const itemRepo = await db.itemsRepo()
    const historyRepo = await db.outfitHistoryRepo()

    let items : Item[] = await itemRepo.find()
    let scores : number[] = []
    items.forEach((item: Item) => {
        let score = 0

        if (item.weather in currentWeather || item.weather === WeatherType.EITHER)
            score += WEATHER_BONUS

        // find the last associated history item
        const results = historyRepo.createQueryBuilder()
            .where('top = :id OR bottom = :id',{id: item.id})
            .orderBy('timestamp')
            .take(1)
            .getOne()

        context.log(results)

        scores.push(score)
    })


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Hello "
    };
};

export default httpTrigger;
