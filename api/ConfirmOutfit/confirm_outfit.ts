import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'
import { OutfitHistory } from '../lib/entities/outfit_history'
import { WeatherType } from '../lib/models/weather_type'
import { CarouselQueue } from '../lib/entities/carousel_queue'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const top = req.body.top
  const bottom = req.body.bottom

  const db = new Database()
  await db.initialize('confirm-outfit')

  const outfitHistoryRepo = await db.outfitHistoryRepo()

  const { id } = await outfitHistoryRepo.save(new OutfitHistory(top, bottom, WeatherType.EITHER))

  const outfitHistory = await outfitHistoryRepo.findOne(id)

  const carouselQueueRepo = await db.carouselQueueRepo()

  await carouselQueueRepo.save(new CarouselQueue(outfitHistory.top, outfitHistory.bottom))

  context.res = {
    status: 200,
    body: outfitHistory
  }

  await db.close()
}

export default httpTrigger
