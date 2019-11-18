"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var user_1 = require("../entity/user");
var event_1 = require("../entity/event");
var moment = require("moment");
var environment_1 = require("../environment");
var typeorm_2 = require("typeorm");
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, eventRepo, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    eventRepo = typeorm_1.getRepository(event_1.Event);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, eventRepo.delete(id)];
                case 2:
                    _a.sent();
                    res.status(200).json({ deleted: true });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(400).json({ deleted: false, message: e_1 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteEvent = deleteEvent;
function getAllEventsMinimal(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var date, eventRepo, month, year, events, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = new Date(req.query.year, req.query.month);
                    eventRepo = typeorm_1.getRepository(event_1.Event);
                    month = date.getMonth() + 1;
                    year = date.getFullYear();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, eventRepo.createQueryBuilder('event')
                            .where("event.user = :id", { id: res.locals.currentUserId })
                            .andWhere(new typeorm_2.Brackets(function (q) {
                            q.where("date_part('month', event.start_time) = :givenMonth", { givenMonth: month });
                            q.andWhere("date_part('year', event.start_time) = :givenYear", { givenYear: year });
                        }))
                            .orWhere(new typeorm_2.Brackets(function (q) {
                            q.where("date_part('month', event.end_time) = :givenMonth", { givenMonth: month });
                            q.andWhere("date_part('year', event.end_time) = :givenYear", { givenYear: year });
                        }))
                            .getMany()];
                case 2:
                    events = _a.sent();
                    console.log(events);
                    res.status(200).json({ events: events });
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    res.status(500).json({ message: e_2 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAllEventsMinimal = getAllEventsMinimal;
function getEvents(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var event, month, year, date, givenDate, eventRepo, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    month = req.params.month;
                    year = req.params.year;
                    date = req.params.date;
                    givenDate = new Date(year, month, date);
                    eventRepo = typeorm_1.getRepository(event_1.Event);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, eventRepo.find({
                            where: { userId: res.locals.currentUserId, start_time: typeorm_2.MoreThanOrEqual(givenDate), end_time: typeorm_2.LessThanOrEqual(givenDate) },
                        })];
                case 2:
                    event = _a.sent();
                    res.status(200).json(event);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    res.status(500).json({ message: err_1.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getEvents = getEvents;
function hasClash(allEvents, currentEvent) {
    /*
    returns null for no clash
    returns clashed event for clash
    */
    var startTime = new Date(currentEvent.start_time);
    var endTime = new Date(currentEvent.end_time);
    for (var _i = 0, allEvents_1 = allEvents; _i < allEvents_1.length; _i++) {
        var e = allEvents_1[_i];
        var eStartTime = new Date(e.start_time);
        var eEndTime = new Date(e.end_time);
        // for clash condition
        if (!(endTime <= eStartTime || startTime >= eEndTime)) {
            return e;
        }
    }
    return null;
}
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, startTime, endTime, description, eventRepo, startDate, endDate, allEvents, event, _a, clashEvent, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    name = req.body.name;
                    startTime = req.body.startTime;
                    endTime = req.body.endTime;
                    description = req.body.description;
                    eventRepo = typeorm_1.getRepository(event_1.Event);
                    startDate = new Date(startTime);
                    endDate = new Date(endTime);
                    return [4 /*yield*/, eventRepo.find({ where: { user: res.locals.currentUserId } })];
                case 1:
                    allEvents = _b.sent();
                    event = new event_1.Event();
                    event.name = name;
                    event.start_time = startTime;
                    event.end_time = endTime;
                    event.description = description;
                    _a = event;
                    return [4 /*yield*/, typeorm_1.getRepository(user_1.User).findOneOrFail(res.locals.currentUserId)];
                case 2:
                    _a.user = _b.sent(); //must be changed here
                    clashEvent = hasClash(allEvents, event);
                    if (!!clashEvent) return [3 /*break*/, 7];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, eventRepo.save(event)];
                case 4:
                    _b.sent();
                    res.status(200).json({ message: "Event Saved Successfully" });
                    return [3 /*break*/, 6];
                case 5:
                    e_3 = _b.sent();
                    res.status(400).json({ message: e_3 });
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    res.status(400).json({ message: "Event could not be created due to clash with event " + clashEvent.name + " \n\t\twhich has startTime: " + moment(clashEvent.startTime).format(environment_1.environment.dateTimePrettyFormat) + " and endTime: " + moment(clashEvent.startTime).format(environment_1.environment.dateTimePrettyFormat) });
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.createEvent = createEvent;
function getEventsByEmail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, eventRepo, events, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.query.email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    eventRepo = typeorm_1.getRepository(event_1.Event);
                    return [4 /*yield*/, eventRepo.createQueryBuilder('event')
                            .select(["event.id", "event.name", "event.start_time", "event.end_time", "event.description"])
                            .innerJoin("event.user", "user")
                            .where('user.email = :email', { email: email })
                            .getMany()];
                case 2:
                    events = _a.sent();
                    res.status(200).json({ events: events });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    res.status(400).json({ message: err_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getEventsByEmail = getEventsByEmail;
function updateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, name, startTime, endTime, description, eventRepo, event, _a, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.body.id;
                    name = req.body.name;
                    startTime = req.body.startTime;
                    endTime = req.body.endTime;
                    description = req.body.description;
                    eventRepo = typeorm_1.getRepository(event_1.Event);
                    return [4 /*yield*/, eventRepo.findOneOrFail({ where: { id: id, user: res.locals.currentUserId } })];
                case 1:
                    event = _b.sent();
                    event.name = name;
                    event.start_time = startTime;
                    event.end_time = endTime;
                    event.description = description;
                    _a = event;
                    return [4 /*yield*/, typeorm_1.getRepository(user_1.User).findOneOrFail(res.locals.currentUserId)];
                case 2:
                    _a.user = _b.sent(); //must be changed here
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, eventRepo.save(event)];
                case 4:
                    _b.sent();
                    res.status(200).json({ message: "Event Saved Successfully" });
                    return [3 /*break*/, 6];
                case 5:
                    e_4 = _b.sent();
                    res.status(500).json({ message: e_4 });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateEvent = updateEvent;
//# sourceMappingURL=home.js.map