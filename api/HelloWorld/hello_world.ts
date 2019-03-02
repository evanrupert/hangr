import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Database } from '../lib/services/database'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')

  const db = new Database()

  await db.initialize()

  const testRepo = await db.testTableRepo()
  const test = await testRepo.findOne(1)

  context.res = {
    status: 200,
    body: {
      test: {
        id: test.id,
        name: test.name
      }
    }
  }
}

export default httpTrigger
