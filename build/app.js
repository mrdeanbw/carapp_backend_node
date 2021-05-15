"use strict";
// app.ts file
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
require('rootpath')();
require('dotenv').config();
var login = require('./src/get/getUser');
var carInfo = require('./src/get/getCar');
var registerUser = require('./src/create/createNewUser');
var addCar = require('./src/create/createNewCar');
var createEmail = require('./_services/emails.service');
var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('./_helpers/error-handler');
var cors = require('cors');
var app = express();
app.get('/test', function (req, res) {
    res.send('test endpoint!');
});
typeorm_1.createConnection().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(express.json());
        app.use(cors());
        // global error handler
        app.use(errorHandler);
        app.listen(process.env.PORT || 4000, function () {
            console.log('Server started on 4000');
        });
        app.get('/test2', function (req, res) {
            res.send('test2 endpoint!');
        });
        app.post('/users/authenticate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, username, password, user, password_1, userWithoutPassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('===================================\nfrom app.ts... /users/authenticate endpoint');
                        _a = req.body, username = _a.username, password = _a.password;
                        return [4 /*yield*/, login.getUser(username, password)];
                    case 1:
                        user = _b.sent();
                        console.log("from app.ts... user: " + user);
                        if (user) { // user exists in database table
                            password_1 = user.password, userWithoutPassword = __rest(user, ["password"]);
                            return [2 /*return*/, res.json(userWithoutPassword)];
                        }
                        else { // user does not exist
                            return [2 /*return*/, res.status(400).json({ message: 'Username or password is incorrect!' })];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        app.post('/users/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, username, password, firstName, lastName, license, regUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('===================================\nfrom app.ts... /users/register endpoint');
                        _a = req.body, username = _a.username, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, license = _a.license;
                        return [4 /*yield*/, registerUser.createNewUser(username, password, firstName, lastName, license)];
                    case 1:
                        regUser = _b.sent();
                        if (regUser === 'Username/Email: ' + username + ' is already taken') {
                            return [2 /*return*/, res.status(400).json({ message: regUser })];
                        }
                        typeof (regUser) === 'string' ? res.json(regUser) : res.send('Register event has been logged');
                        return [2 /*return*/];
                }
            });
        }); });
        app.post('/vehicles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var yourCar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('===================================\nfrom app.ts... /vehicles endpoint');
                        return [4 /*yield*/, addCar.createNewCar(req.body.carData[0], req.body.carData[1], req.body.carData[2], req.body.carData[3], req.body.carData[4], req.body.carData[5], req.body.carData[6], req.body.carData[7])];
                    case 1:
                        yourCar = _a.sent();
                        typeof (yourCar) === 'string' ? res.json(yourCar) : res.send('Vehicles event has been logged');
                        return [2 /*return*/];
                }
            });
        }); });
        app.post('/emails', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, service, user, password, sender, receiver, userId, carMessage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('===================================\nfrom app.ts... /emails endpoint');
                        _a = req.body, service = _a.service, user = _a.user, password = _a.password, sender = _a.sender, receiver = _a.receiver, userId = _a.userId;
                        console.log('the userId is: ' + userId);
                        return [4 /*yield*/, carInfo.getCar(userId)];
                    case 1:
                        carMessage = _b.sent();
                        return [4 /*yield*/, createEmail.sendgmail(service, user, password, sender, receiver, carMessage)];
                    case 2:
                        _b.sent();
                        res.send('Email event has been logged');
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
// export the app
exports.default = app;
//# sourceMappingURL=app.js.map