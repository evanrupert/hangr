import { Prediction } from '../models/prediction'
import { WeatherType } from '../models/weather_type'

const coldClothes = [
  'coat',
  'jacket',
  'sweater',
  'snow',
  'hoodie'
]

const hotClothes = [
  'shirt',
  'short',
  'tank top'
]

const rainyClothes = [
  'rain',
  'windbreaker'
]

const tops = [
  'shirt',
  'jacket',
  'coat',
  'sweater',
  'top',
  'torso',
  'raincoat',
  'hoodie'
]

const bottoms = [
  'jean',
  'short',
  'pants',
  'skirt'
]

export function determineWeatherType(prediction: Prediction): WeatherType {
  if (hasKeyword(prediction, rainyClothes))
    return WeatherType.RAINY
  else if (hasKeyword(prediction, coldClothes))
    return WeatherType.COLD
  else if (hasKeyword(prediction, hotClothes))
    return WeatherType.HOT
  else
    return WeatherType.EITHER
}

// throw an error if the image is not valid
export function isTop(prediction: Prediction): boolean {
    if(hasKeyword(prediction, tops))
        return true;
    else if(hasKeyword(prediction, bottoms))
        return false;

    throw new Error('This image is not a valid shirt or pants.')
}

function hasKeyword(prediction: Prediction, keywords: string[]): boolean {
  return keywords.some((keyword: string) => prediction.name.toLowerCase().includes(keyword))
}
