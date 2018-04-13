import { Router } from 'express'
import { injectable, inject } from 'inversify'
import { TYPES } from '../types'
import { UserCreationRequest } from 'tsoa-example-models'
import { UserClientInterface } from '../services/userClient'

@injectable()
export class IndexController {
  private userClient: UserClientInterface

  public constructor(@inject(TYPES.UserClientInterface) userClient: UserClientInterface) {
    this.userClient = userClient
  }

  public async getAll(req, res, next) {
    try {
      let users = await this.userClient.getAll()
      res.render('index.pug', { title: 'Users', users: users })
    } catch (error) {
      next(error)
    }
  }

  public async get(req, res, next) {
    try {
      let user = await this.userClient.get(+req.params.id)
      res.render('user.pug', { title: 'User', user: user })
    } catch (error) {
      next(error)
    }
  }

  public async post(req, res, next) {
    try {
    let userCreationRequest: UserCreationRequest = {
      name: req.body.name,
      email: req.body.email,
      phoneNumbers: []
    }

      await this.userClient.create(userCreationRequest)
      res.redirect('/')
    } catch (error) {
      next(error)
    }
  }

  public attachRoutes(router: Router) {
    router.get('/', this.getAll.bind(this)) // needed so instance of controller can access `this.userClient`
    router.get('/:id', this.get.bind(this))
    router.post('/', this.post.bind(this))
  }
}
