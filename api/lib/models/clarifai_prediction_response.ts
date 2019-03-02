import { Prediction } from './prediction'

export interface ClarifaiPredictionResponse {
  outputs: {
    data: {
      concepts: Prediction[]
    }
  }[]
}