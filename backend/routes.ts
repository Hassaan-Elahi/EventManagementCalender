import { Router } from 'express';
import {login, resetPassword} from "./controllers/login";
import {
	createEvent,
	deleteEvent,
	getAllEventsMinimal,
	getEvents,
	getEventsByEmail,
	updateEvent
} from "./controllers/home";
import {checkJwt} from "./checkJwt";

const router = Router();



router.post('/login', login);
router.get('/events', checkJwt(),  getAllEventsMinimal);
router.post('/create-event', checkJwt(), createEvent);
router.patch('/update-event',checkJwt(),updateEvent);

// should use rjx to restrict  getEvents to only numbers
router.get('/event/:year/:month/:date', checkJwt(), getEvents);
router.delete('/delete-event/:id',checkJwt(), deleteEvent);

router.post('/reset-password', checkJwt(), resetPassword);
router.get('/get-events-email', checkJwt(), getEventsByEmail);


	
export default router;
