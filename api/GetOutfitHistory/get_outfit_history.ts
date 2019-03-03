import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const db = new Database()
  await db.initialize('get-outfit-history')

  const outfitHistoryRepo = await db.outfitHistoryRepo()

  const itemRepo = await db.itemsRepo()

  const histories = await outfitHistoryRepo.find()

  const historyWithItems: any[] = []
  for (let history of histories) {
    historyWithItems.push({
      top: await itemRepo.findOne(history.top),
      bottom: await itemRepo.findOne(history.bottom),
      weather: history.weather,
      id: history.id,
      timestamp: history.timestamp
    })
  }

  context.res = {
    status: 200,
    body: historyWithItems
  }

  await db.close()
}

export default httpTrigger
