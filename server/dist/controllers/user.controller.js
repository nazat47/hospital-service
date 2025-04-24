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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db/db");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const jwt_1 = require("../utils/jwt");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        throw new errors_1.BadRequestError("email,name and password is required");
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield db_1.db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    if (!user) {
        throw new errors_1.BadRequestError("Failed to register user");
    }
    res
        .status(200)
        .json({ success: true, message: "User registered successfully" });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("email and password is required");
    }
    const userExists = yield db_1.db.user.findFirst({
        where: {
            email,
        },
    });
    if (!userExists) {
        throw new errors_1.NotFoundError("Invalid email or password");
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, userExists.password);
    if (!isPasswordCorrect) {
        throw new errors_1.BadRequestError("Invalid email or password");
    }
    const tokenPayload = (0, utils_1.createTokenUser)(userExists);
    const token = (0, utils_1.createToken)(tokenPayload);
    (0, jwt_1.attachCookies)({ res, token });
    res.status(200).json({ success: true, accessToken: token });
});
exports.loginUser = loginUser;
