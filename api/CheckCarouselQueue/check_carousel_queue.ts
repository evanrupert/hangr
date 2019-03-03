import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')

  const db = new Database()
  await db.initialize()
  const carouselQueueRepo = await db.carouselQueueRepo()

  const queue = await carouselQueueRepo.find()

  if (queue.length === 0) {
    context.res = {
      status: 200,
      body: {
        messageInQueue: false
      }
    }
  } else {
    context.res = {
      status: 200,
      body: {
        messageInQueue: true,
        message: {
          top: queue[0].top,
          bottom: queue[0].bottom
        }
      }
    }
    await carouselQueueRepo.clear()
  }

  await db.close()
}

export default httpTrigger
