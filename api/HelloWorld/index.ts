import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { Connection, createConnection } from 'typeorm'
import { TestTable } from '../lib/models/test_table'
import { Database } from '../lib/database'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')

  const db = new Database()

  await db.initialize()

  const test = await db.conn.getRepository(TestTable).findOne(1)

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
