import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')

  context.res = {
    status: 200,
    body: {
      top: randomIndex(),
      bottom: randomIndex()
    }
  }
}

function randomIndex(): number {
  return Math.floor(Math.random() * 8)
}

export default httpTrigger
