import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')

  const db = new Database()
  await db.initialize('check-carousel-queue')
  const carouselQueueRepo = await db.carouselQueueRepo()
  const itemRepo = await db.itemsRepo()

  const queue = await carouselQueueRepo.find()

  if (queue.length === 0) {
    context.res = {
      status: 200,
      body: {
        messageInQueue: false
      }
    }
  } else {
    const itemId = queue[0].top

    const item = await itemRepo.findOne(itemId)

    context.res = {
      status: 200,
      body: {
        messageInQueue: true,
        message: {
          top: item.idx,
        }
      }
    }
    await carouselQueueRepo.clear()
  }

  await db.close()
}

export default httpTrigger
