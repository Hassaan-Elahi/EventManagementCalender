"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = require("./controllers/login");
var home_1 = require("./controllers/home");
var checkJwt_1 = require("./checkJwt");
var router = express_1.Router();
router.post('/login', login_1.login);
router.get('/events', checkJwt_1.checkJwt(), home_1.getAllEvents);
router.post('/create-event', checkJwt_1.checkJwt(), home_1.createEvent);
router.get('/get-event/:id', checkJwt_1.checkJwt(), home_1.getEvent);
router.delete('/delete-event/:id', checkJwt_1.checkJwt(), home_1.deleteEvent);
exports.default = router;
//# sourceMappingURL=routes.js.map