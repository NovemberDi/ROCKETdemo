const {Router} = require('express')
import { apiController } from "./apiController"
const apiRouter = new Router()

apiRouter.get('/leads', apiController.leads)
  
export {apiRouter}
  