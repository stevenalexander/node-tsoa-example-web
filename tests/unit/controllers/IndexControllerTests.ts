import 'mocha'
import { expect } from 'chai'
import * as supertest from 'supertest'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { mock, instance, when, verify } from 'ts-mockito'
import { TYPES } from '../../../src/types'
import { iocContainer } from '../../../src/ioc'
import { User } from 'tsoa-example-models'
import { MockViewEngine } from '../mockViewEngine'
import { UserClient } from '../../../src/services/userClient'
import { IndexController } from '../../../src/controllers/indexController'

describe('IndexController', function () {
  let request
  let indexController
  let mockUserClient: UserClient
  let user1: User = {
    id: 1234,
    email: 'string',
    name: 'Name',
    phoneNumbers: [],
    status: 'status'
  }

  beforeEach(function () {
    const app = express()
    const mockViewEngine = new MockViewEngine
    mockViewEngine.viewEngine(app, '../../views')
    app.use(bodyParser.urlencoded({ extended: false }))

    const router = express.Router()
    app.use('/', router)

    mockUserClient = mock(UserClient)
    iocContainer.rebind(TYPES.UserClientInterface).toConstantValue(instance(mockUserClient))

    indexController = iocContainer.get<IndexController>(TYPES.IndexController)
    indexController.attachRoutes(router)

    request = supertest(app)
  })

  describe('GET /', function () {
    it('should return index response', () => {
      when(mockUserClient.getAll()).thenResolve([user1])

      return request
        .get('/')
        .expect(200)
        .then(res => {
          expect(res.text).to.contain(user1.name)
          verify(mockUserClient.getAll()).once()
        })
    })
  })
})
