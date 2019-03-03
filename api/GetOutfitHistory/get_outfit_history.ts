import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const db = new Database()
  await db.initialize('get-outfit-history')

  const outfitHistoryRepo = await db.outfitHistoryRepo()

  const history = await outfitHistoryRepo.find()

  context.res = {
    status: 200,
    body: history
  }
}

export default httpTrigger
