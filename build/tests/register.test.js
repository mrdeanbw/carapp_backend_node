"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
var typeorm_1 = require("typeorm");
var request = require("supertest");
var UserRepository_1 = require("../src/repository/UserRepository");
// login test is expected to work
describe('POST /users/register - add new user to database table', function () {
    var result;
    var connection;
    var userRepo;
    var parsed;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.createConnection()];
                case 1:
                    connection = _a.sent();
                    userRepo = new UserRepository_1.UserRepository();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Delete the record
                return [4 /*yield*/, userRepo.deleteUser('xxxxx@mail.com')];
                case 1:
                    // Delete the record
                    _a.sent();
                    return [4 /*yield*/, connection.close()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Register new user with valid credentials', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app_1.default).post('/users/register').send({
                        username: 'xxxxx@mail.com',
                        password: 'zzzzzzzzzzz',
                        firstName: 'vvvvvvvvvvv',
                        lastName: 'mmmmmmmmmmmm',
                        license: 222222222
                    })];
                case 1:
                    result = _a.sent();
                    expect(result.text).toEqual('Register event has been logged');
                    expect(result.status).toEqual(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Register new user with existing username', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app_1.default).post('/users/register').send({
                        username: 'xxxxx@mail.com',
                        password: 'oooooooooooo',
                        firstName: 'ppppppppppp',
                        lastName: 'ssssssssssss',
                        license: 1
                    })];
                case 1:
                    result = _a.sent();
                    parsed = JSON.parse(result.text);
                    expect(parsed.message).toEqual('Username/Email: xxxxx@mail.com is already taken');
                    expect(result.status).toEqual(400);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Register new user without password', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app_1.default).post('/users/register').send({
                        username: 'qqqqqqqqqqqq',
                        password: '',
                        firstName: 'ppppppppppp',
                        lastName: 'ssssssssssss',
                        license: 1
                    })];
                case 1:
                    result = _a.sent();
                    parsed = JSON.parse(result.text);
                    expect(parsed).toEqual('email and password cannot be empty');
                    expect(result.status).toEqual(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Register new user with invalid license', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app_1.default).post('/users/register').send({
                        username: 'random@mail.com',
                        password: 'password',
                        firstName: 'first',
                        lastName: 'last',
                        license: 2147483648 // 1 above integer limit
                    })];
                case 1:
                    result = _a.sent();
                    parsed = JSON.parse(result.text);
                    expect(parsed).toEqual('could not create new user');
                    expect(result.status).toEqual(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=register.test.js.map