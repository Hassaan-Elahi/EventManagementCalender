import { Router } from 'express';
import { login } from "./controllers/login";
import {createEvent, getAllEvents, getEvent} from "./controllers/home";

const router = Router();



router.post('/login', login);
router.get('/events', getAllEvents);
router.post('/create-event', createEvent);
router.get('/get-event/:id([0-9])+', getEvent);


	
export default router;
