import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { UserClientInterface, UserClient } from './services/userClient'
import { IndexController } from './controllers/indexController'

const iocContainer = new Container()

iocContainer.bind<string>(TYPES.UserClientUrl).toConstantValue(process.env.API_URL || 'http://localhost:3001/api')
iocContainer.bind<UserClientInterface>(TYPES.UserClientInterface).to(UserClient).inSingletonScope()
iocContainer.bind<IndexController>(TYPES.IndexController).to(IndexController)

export { iocContainer }
