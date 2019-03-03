import { ApisauceInstance, create, ApiResponse } from "apisauce"
import RNFetchBlob from "rn-fetch-blob"
import firebase, { Firebase } from "react-native-firebase"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  firebase: Firebase

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config

    this.firebase = firebase
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  async setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getItems(): Promise<Types.GetItems> {
    let response: ApiResponse<any>
    try {
      response = await this.apisauce.get("/api/getallitems") // NOTE: Put in ping local url
    } catch (err) {
      console.error(err)
    }

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.error(response)
      if (problem) return problem
    }

    const convertItems = ({ id, top, url, weather, idx }) => ({
      id,
      top,
      url,
      weather,
      idx,
    })

    try {
      const items: Types.Item[] = response.data.map(convertItems)
      return { kind: "ok", items }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getRecommendation(): Promise<Types.GetRecommendation> {
    let response: ApiResponse<any>
    try {
      response = await this.apisauce.get("/api/getrecommendation") // NOTE: Put in ping local url
    } catch (err) {
      console.error(err)
    }

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.error(response)
      if (problem) return problem
    }

    const convertRecommendation = ({ top, bottom }) => ({
      top,
      bottom,
    })

    try {
      const recommendation: Types.Recommendation = response.data
      return { kind: "ok", recommendation }
    } catch (err) {
      console.error(err)
      return { kind: "bad-data" }
    }
  }

  async confirmRecommendation(topId: number, bottomId: number): Promise<void> {
    let response: ApiResponse<any>
    try {
      response = await this.apisauce.post("/api/confirmoutfit", { top: topId, bottom: bottomId })
      return { kind: "ok" }
    } catch (err) {
      console.error(err)
    }
  }

  async uploadImage(uri: string): Promise<void> {
    try {
      const response = await this.firebase
        .storage()
        .ref(
          `/test-${Math.floor(Math.random() * (Math.floor(100000) - Math.ceil(1))) +
            Math.ceil(1)}.jpg`,
        )
        .putFile(uri)

      const url = response.downloadURL

      const data = await fetch("http://7c718e71.ngrok.io/api/createitem", {
        method: "POST",
        body: JSON.stringify({
          url,
        }),
      })

      console.warn(data)
    } catch (fail) {
      console.warn(fail)
    }
  }
}
