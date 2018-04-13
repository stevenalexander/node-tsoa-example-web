import { Router } from 'express'
import { injectable, inject } from 'inversify'
import { TYPES } from '../types'
import { UserClientInterface } from '../services/userClient'

@injectable()
export class IndexController {
  private userClient: UserClientInterface

  public constructor(@inject(TYPES.UserClientInterface) userClient: UserClientInterface) {
    this.userClient = userClient
  }

  public async get(req, res, next) {
    let users = await this.userClient.getAll()
    res.render('index.pug', { title: 'Users', users: users })
  }

  public attachRoutes(router: Router) {
    router.get('/', this.get.bind(this)) // needed so instance of controller can access `this.userClient`
  }
}
