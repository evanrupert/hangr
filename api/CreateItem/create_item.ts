import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'
import { Item } from '../lib/entities/item'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')
  const url = req.body.url

  const db = new Database()
  await db.initialize()

  const itemsRepo = await db.itemsRepo()

  const newItem = new Item(true, url, 'Rainy', 5)

  await itemsRepo.save(newItem)

  context.res = {
    status: 200,
    body: {
      ok: true,
      item: newItem
    }
  }
}

export default httpTrigger
