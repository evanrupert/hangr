import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'
import { Item } from '../lib/entities/item'
import { Clarifai } from '../lib/services/clarifai'
import { determineWeatherType, isTop } from '../lib/modules/predictions'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')
  const url = req.body.url

  const clarifai = new Clarifai()

  const prediction = await clarifai.getTopPredictionForImage(url)

  const db = new Database()
  await db.initialize()
  const itemsRepo = await db.itemsRepo()


  const newItem = await itemsRepo.save(new Item(
    isTop(prediction),
    url,
    determineWeatherType(prediction),
    0
  ))

  context.res = {
    status: 200,
    body: {
      ok: true,
      item: newItem
    }
  }
}

export default httpTrigger
