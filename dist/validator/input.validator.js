"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByIdSchema = exports.LoginSchema = exports.verifyEmailSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object().keys({
    full_name: joi_1.default.string().regex(/^[A-Za-z\s]+$/).required().label("Full Name").messages({
        'string.pattern.base': '{{#label}} must contain alphabetic characters only'
    }),
    email: joi_1.default.string().email().required().label('Email'),
    password: joi_1.default.string().required().min(4).max(12).label('Password')
});
exports.verifyEmailSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required().label("Email"),
    code: joi_1.default.number().required().label("OTP")
});
exports.LoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required().label("Email"),
    password: joi_1.default.string().required().label('Password')
});
exports.getPostByIdSchema = joi_1.default.object().keys({
    post_id: joi_1.default.number().required().label("Post id")
});
