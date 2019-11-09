"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = require("./controllers/login");
var home_1 = require("./controllers/home");
var router = express_1.Router();
router.post('/login', login_1.login);
router.get('/events', home_1.getAllEvents);
router.post('/create-event', home_1.createEvent);
router.get('/get-event/:id([0-9])+', home_1.getEvent);
exports.default = router;
//# sourceMappingURL=routes.js.map