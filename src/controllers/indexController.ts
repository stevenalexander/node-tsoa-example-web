import { Router } from 'express'

export class IndexController {
  public attachRoutes(router: Router) {
    router.get('/', function(req, res, next) {
      res.render('index.pug', { title: 'Express' })
    })
  }
}
