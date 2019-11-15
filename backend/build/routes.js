"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = require("./controllers/login");
var home_1 = require("./controllers/home");
var checkJwt_1 = require("./checkJwt");
var router = express_1.Router();
router.post('/login', login_1.login);
router.get('/events', checkJwt_1.checkJwt(), home_1.getAllEventsMinimal);
router.post('/create-event', checkJwt_1.checkJwt(), home_1.createEvent);
router.patch('/update-event', checkJwt_1.checkJwt(), home_1.updateEvent);
// should use rjx to restrict  getEvents to only numbers
router.get('/event/:year/:month/:date', checkJwt_1.checkJwt(), home_1.getEvents);
router.delete('/delete-event/:id', checkJwt_1.checkJwt(), home_1.deleteEvent);
router.post('/reset-password', checkJwt_1.checkJwt(), login_1.resetPassword);
router.get('/get-events-email', checkJwt_1.checkJwt(), home_1.getEventsByEmail);
exports.default = router;
//# sourceMappingURL=routes.js.map