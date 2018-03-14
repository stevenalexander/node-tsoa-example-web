import 'mocha'
import * as supertest from 'supertest'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { MockViewEngine } from '../mockViewEngine'
import { IndexController } from '../../../src/controllers/indexController'

describe('IndexController', function () {
  let request

  beforeEach(function () {
    const app = express()
    const mockViewEngine = new MockViewEngine
    mockViewEngine.viewEngine(app, '../../views')
    app.use(bodyParser.urlencoded({ extended: false }))

    const router = express.Router()
    app.use('/', router)

    const indexController = new IndexController
    indexController.attachRoutes(router)

    request = supertest(app)
  })

  describe('GET /', function () {
    it('should return index response', () => {
      return request
        .get('/')
        .expect(200)
    })
  })
})
