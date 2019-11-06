import { Router } from 'express';
import { login } from "./controllers/login";
import {getAllEvents} from "./controllers/home";

const router = Router();



router.post('/login', login);
router.get('/events/::id([0-9]+)', getAllEvents);


	
export default router;
