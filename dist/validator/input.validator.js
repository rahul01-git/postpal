"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidator = exports.updatePostValidator = exports.createPostValidator = exports.getPostByIdSchema = exports.LoginSchema = exports.verifyEmailSchema = exports.registerSchema = void 0;
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
exports.createPostValidator = joi_1.default.object({
    description: joi_1.default.string().min(3).max(1000)
});
exports.updatePostValidator = joi_1.default.object({
    post_id: joi_1.default.number().required().label("Post id"),
    description: joi_1.default.string().min(3).max(1000)
});
exports.idValidator = joi_1.default.object({
    post_id: joi_1.default.number().required().label("Post id"),
});
