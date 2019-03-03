import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'
import { Weather } from '../lib/services/weather'
import { WeatherType } from '../lib/models/weather_type'
import { Item } from '../lib/entities/item'
import { ItemRecommendation } from '../lib/models/item_recommendation'
import { mostRecentOutfitHistory } from '../lib/modules/queries'

const WEATHER_BONUS: number = 3.0
const STALL_MULTIPLIER: number = 0.05
const RANDOM_MULTIPLIER: number = 1.2

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')

  const weatherService = new Weather(75)
  const currentWeather: WeatherType[] = await weatherService.getWeather('32816,us')

  console.log(`Current Weather: ${currentWeather}`)

  const db = new Database()
  await db.initialize('get-recommendation')

  const itemRepo = await db.itemsRepo()

  let items: Item[] = await itemRepo.find()
  let recommendedTop: ItemRecommendation = null
  let recommendedBottom: ItemRecommendation = null

  console.log('before map')

  for (let item of items) {
    console.log('======================================')
    console.log(`Calculaton score for ${item.id}`)
    console.log(item)
    let weatherWeight = 0
    let stallWeight = 0

    if (currentWeather.includes(item.weather as WeatherType) || item.weather === WeatherType.EITHER)
      weatherWeight += WEATHER_BONUS

    const lastOutfitHistory = await mostRecentOutfitHistory(db, item.id)

    if (lastOutfitHistory) {
      const historyTimestamp = lastOutfitHistory.timestamp.getTime()
      const currentDate = (new Date()).getTime()

      const diff =  currentDate - historyTimestamp
      stallWeight += Math.log(diff) * STALL_MULTIPLIER
    } else {
      stallWeight += 2
    }

    let randomWeight = Math.random() * RANDOM_MULTIPLIER

    console.log(`Weather: ${weatherWeight}`)
    console.log(`Stall: ${stallWeight}`)
    console.log(`Random: ${randomWeight}`)
    let score = stallWeight + weatherWeight + randomWeight

    console.log(`Total Score: ${score}`)
    console.log('======================================')

    if (item.top) {
      if (recommendedTop === null || recommendedTop.score < score)
        recommendedTop = { item, score }
    } else {
      if (recommendedBottom === null || recommendedBottom.score < score)
        recommendedBottom = { item, score }
    }
  }

  context.res = {
    body: {
      top: recommendedTop,
      bottom: recommendedBottom,
    }
  }

  await db.close()
}

export default httpTrigger
