"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const getJwtToken = (id, email) => {
    const jwtSecret = process.env.JWT_SECRET;
    const expiresIn = '1d';
    const payload = {
        id,
        email
    };
    const signedToken = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn });
    return {
        token: "Bearer " + signedToken,
        expiresIn
    };
};
exports.getJwtToken = getJwtToken;
