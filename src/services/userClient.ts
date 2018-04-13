import { injectable, inject } from 'inversify'
import axios from 'axios'
import { TYPES } from '../types'
import { User, UserCreationRequest } from 'tsoa-example-models'

export interface UserClientInterface {
  getAll(): Promise<User[]>
  get(id: number): Promise<User>
  create(userCreationRequest: UserCreationRequest): Promise<void>
}

@injectable()
export class UserClient implements UserClientInterface {
  url: string
  constructor(@inject(TYPES.UserClientUrl) userClientUrl: string) {
    this.url = userClientUrl
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
