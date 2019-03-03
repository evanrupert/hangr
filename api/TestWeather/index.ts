import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Weather } from '../lib/services/weather'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.')
    const name = (req.query.name || (req.body && req.body.name));

    const weatherService = new Weather(75)

    const resp = await weatherService.getWeather('32816,us')
    context.log(resp)

    if (name) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

export default httpTrigger;
