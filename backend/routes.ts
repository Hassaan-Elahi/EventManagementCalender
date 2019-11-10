import { Router } from 'express';
import { login } from "./controllers/login";
import {createEvent, deleteEvent, getAllEvents, getEvent} from "./controllers/home";
import {checkJwt} from "./checkJwt";

const router = Router();



router.post('/login', login);
router.get('/events', checkJwt(),  getAllEvents);
router.post('/create-event', checkJwt(), createEvent);
router.get('/get-event/:id', checkJwt(), getEvent);
router.delete('/delete-event/:id',checkJwt(), deleteEvent);


	
export default router;
