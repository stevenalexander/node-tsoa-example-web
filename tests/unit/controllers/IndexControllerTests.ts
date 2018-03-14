import 'mocha'
import * as supertest from 'supertest'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { User, UserCreationRequest } from 'tsoa-example-models'
import { MockViewEngine } from '../mockViewEngine'
import { UserClientInterface } from '../../../src/services/userClient'
import { IndexController } from '../../../src/controllers/indexController'

class MockUserClient implements UserClientInterface {
  user: User = {
    id: 1234,
    name: 'Name',
    email: 'email',
    phoneNumbers: []
  }

  getAll(): Promise<User[]> { return Promise.resolve<User[]>([this.user]) }
  get(id: number): Promise<User> { return Promise.resolve<User>(this.user) }
  create(userCreationRequest: UserCreationRequest): Promise<void> { return Promise.resolve() }
}

describe('IndexController', function () {
  let request

  beforeEach(function () {
    const app = express()
    const mockViewEngine = new MockViewEngine
    mockViewEngine.viewEngine(app, '../../views')
    app.use(bodyParser.urlencoded({ extended: false }))

    const router = express.Router()
    app.use('/', router)

    // TODO inject UserClient
    const mockUserClient = new MockUserClient
    router.use(function (req, res, next) {
      req['userClient'] = mockUserClient
      next()
    })

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
