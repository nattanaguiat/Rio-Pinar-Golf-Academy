import {Router} from 'express'
import { coachesList } from '../controllers/coach.controller.js'

const coachRouter = Router()

coachRouter.get('/list', coachesList)


export default coachRouter