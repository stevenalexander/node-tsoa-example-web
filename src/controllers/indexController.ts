import { Router } from 'express'
import { UserClientInterface } from '../services/userClient'

export class IndexController {
  public async get(req, res, next) {
    let userClient: UserClientInterface = req.userClient // TODO inject
    let users = await userClient.getAll()
    res.render('index.pug', { title: 'Users', users: users })
  }

  public attachRoutes(router: Router) {
    router.get('/', this.get)
  }
}
