import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export interface Item {
  id: number
  top: boolean
  url: string
  weather: string
  idx: number
}

export interface HistoryItem {
  top: Item
  bottom: Item
  weather: string
  id: number
  timestamp: string
}

export type GetItems = { kind: "ok"; items: JSON } | GeneralApiProblem
export type GetHistory = { kind: "ok"; items: JSON } | GeneralApiProblem

export interface Recommendation {
  top: {
    item: Item
    score: number
  }
  bottom: {
    item: Item
    score: number
  }
}

export type GetRecommendation = { kind: "ok"; recommendation: JSON } | GeneralApiProblem

export type Ping = { kind: "ok"; response: string } | GeneralApiProblem
