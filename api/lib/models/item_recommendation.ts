import { Item } from '../entities/item'

export interface ItemRecommendation {
  item: Item
  score: number
}