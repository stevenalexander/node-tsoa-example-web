import axios from 'axios'
import { User, UserCreationRequest } from 'tsoa-example-models'

export interface UserClientInterface {
  getAll(): Promise<User[]>
  get(id: number): Promise<User>
  create(userCreationRequest: UserCreationRequest): Promise<void>
}

export class UserClient implements UserClientInterface {
  url: string
  constructor(url: string) {
      this.url = url
  }

  public async getAll(): Promise<User[]> {
    return axios.get(`${this.url}/Users`)
      .then((response) => {
        return response.data
      })
  }

  public async get(id: number): Promise<User> {
    return axios.get(`${this.url}/Users/${id}`)
      .then((response) => {
        return response.data
      })
  }

  public async create(userCreationRequest: UserCreationRequest): Promise<void> {
    return axios.post(`${this.url}/Users`, userCreationRequest)
    .then((response) => {
      return null
    })
  }
}
