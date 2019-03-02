import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')

  const db = new Database()
  await db.initialize()

  const itemsRepo = await db.itemsRepo()

  const items = await itemsRepo.find()

  context.res = {
    status: 200,
    body: {
      data: items
    }
  }

  await db.close()
}

export default httpTrigger
