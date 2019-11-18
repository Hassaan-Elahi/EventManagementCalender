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
var class_transformer_1 = require("class-transformer");
var user_1 = require("../entity/user");
var jwt = require("jsonwebtoken");
var environment_1 = require("../environment");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, userRepo, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    password = req.body.password;
                    userRepo = typeorm_1.getRepository(user_1.User);
                    return [4 /*yield*/, userRepo.findOne({
                            where: { 'email': email }
                        })];
                case 1:
                    user = _a.sent();
                    if (user !== undefined && user.password === password) {
                        token = jwt.sign(user.id, environment_1.environment.JWT_SECRET);
                        res.cookie("token", token, { httpOnly: true });
                        res.status(200).json({ user: class_transformer_1.classToPlain(user), token: token });
                    }
                    else {
                        res.status(401).send({ error: "unAuthorized" });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepo, user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepo = typeorm_1.getRepository(user_1.User);
                    user = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.findOneOrFail(res.locals.currentUserId)];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(404).json({ message: e_1.message });
                    return [3 /*break*/, 4];
                case 4:
                    user.password = req.body.password;
                    return [4 /*yield*/, userRepo.save(user)];
                case 5:
                    _a.sent();
                    // // sending new token -- ASK
                    // const newToken = jwt.sign(res.locals.currentUserId, environment.JWT_SECRET);
                    // res.cookie("token", newToken, { httpOnly:true });
                    //
                    res.status(200).json({});
                    return [2 /*return*/];
            }
        });
    });
}
exports.resetPassword = resetPassword;
//# sourceMappingURL=login.js.map