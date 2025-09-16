import { Router } from 'express'
import { bookingCancel, bookingComplete, bookingsCoach, coachDashboard, coachesList, coachProfile, loginCoach, updateCoachProfile } from '../controllers/coach.controller.js'
import authCoach from '../middlewares/authCoach.js'

const coachRouter = Router()

coachRouter.get('/list', coachesList)
coachRouter.post('/login', loginCoach)
coachRouter.get('/bookings', authCoach, bookingsCoach)
coachRouter.post('/complete-booking', authCoach, bookingComplete)
coachRouter.post('/cancel-booking', authCoach, bookingCancel)
coachRouter.get('/dashboard', authCoach, coachDashboard)
coachRouter.get('/profile', authCoach, coachProfile)
coachRouter.post('/update-profile', authCoach, updateCoachProfile)

export default coachRouter