import { Prediction } from '../models/prediction'
import axios, { AxiosRequestConfig } from 'axios'
import { ClarifaiPredictionResponse } from '../models/clarifai_prediction_response'

export class Clarifai {
  private apparelModelUrl = 'https://api.clarifai.com/v2/models/e0be3b9d6a454f0493ac3a30784001ff/outputs'
  private apiKey: string

  constructor() {
    this.apiKey = process.env.CLARIFAI_API_KEY
  }

  async getTopPredictionForImage(url: string): Promise<Prediction> {
    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': `Key ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    }

    let resp = await axios.post<ClarifaiPredictionResponse>(this.apparelModelUrl, {
      inputs: [
        {
          data: {
            image: {
              url: url
            }
          }
        }
      ]
    }, config)

   return resp.data.outputs[0].data.concepts[0]
  }
}
