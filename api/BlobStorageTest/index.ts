import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as storage from 'azure-storage'

const storage_url = 'DefaultEndpointsProtocol=https;AccountName=hangrimagestorage;AccountKey=HetbS1Q0SOm99braKnCi3IH4tkcLbVWB8xTtDvUkDQyl2tfXl7Q9pT0EkcEeAg9wWDqUaDcv4n3zbjDiGbCETw==;EndpointSuffix=core.windows.net'

const container_name = 'test-container'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    const blobService = storage.createBlobService(storage_url)

    const createContainer = async function (containerName: string) {
        return new Promise((resolve, reject) => {
            blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ message: `Container '${containerName}' created` });
                }
            });
        });
    };

    const uploadString = async function (containerName: string, blobName: string, text: string) {
        return new Promise((resolve, reject) => {
            blobService.createBlockBlobFromText(containerName, blobName, text, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ message: `Text "${text}" is written to blob storage` });
                }
            });
        });
    };

    context.log("test")

    context.log("uploading text to blob?")
    await createContainer(container_name)
    uploadString(container_name, "test", "Hello, Blobs")

    if (name) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello, again " + (req.query.name || req.body.name)
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
