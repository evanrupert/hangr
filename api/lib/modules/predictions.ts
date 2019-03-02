import { Prediction } from '../models/prediction'
import { WeatherType } from '../models/weather_type'

const coldClothes = [
  'coat',
  'jacket',
  'sweater'
]

// const hotClothes = [
//   'shirt',
//   'skirt',
//   'dress',
//   'short'
// ]

const rainyClothes = [
  'raincoat'
]

const tops = [
  'shirt',
  'jacket',
  'coat',
  'sweater',
  'top',
  'torso',
  'raincoat'
]

// const bottoms = [
//   'jean',
//   'short',
//   'pants',
//   'skirt'
// ]

export function determineWeatherType(prediction: Prediction): WeatherType {
  if (hasKeyword(prediction, rainyClothes))
    return WeatherType.RAINY
  else if (hasKeyword(prediction, coldClothes))
    return WeatherType.COLD
  else
    return WeatherType.HOT
}

export function isTop(prediction: Prediction): boolean {
  return hasKeyword(prediction, tops)
}

function hasKeyword(prediction: Prediction, keywords: string[]): boolean {
  return keywords.some((keyword: string) => prediction.name.includes(keyword))
}