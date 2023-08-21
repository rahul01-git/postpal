"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const validator_1 = require("../validator");
const helpers_1 = require("../helpers");
exports.userResolver = {
    Query: {
        getAllUsers: async (_, {}) => {
            try {
                const allUsers = await models_1.User.findAll();
                return allUsers;
            }
            catch (error) {
                console.log(`Error while retrieving all users: ${error}`);
            }
        }
    },
    Mutation: {
        registerUser: async (parent, args) => {
            const { error } = validator_1.registerSchema.validate(args.data);
            if (error)
                throw error;
            const { full_name, email, password } = args.data;
            const user = await models_1.User.findOne({ where: { email } });
            if (user)
                throw new Error(`Email:${email} already used`);
            try {
                const otp = Math.floor(100000 + Math.random() * 900000);
                const hashedPass = await bcryptjs_1.default.hash(password, 12);
                const newUser = await models_1.User.create({
                    full_name,
                    email,
                    otp,
                    password: hashedPass
                });
                await (0, helpers_1.sendEmail)({
                    to: email,
                    subject: 'Verify Your Account',
                    text: '',
                    html: (0, helpers_1.emailVerifyTemplate)(otp)
                });
                return newUser;
            }
            catch (error) {
                console.error('Error registering user:', error);
                throw new Error('Could not register user: ' + error);
            }
        },
        verifyEmail: async (parent, args) => {
            try {
                const { error } = validator_1.verifyEmailSchema.validate(args.data);
                if (error)
                    throw error;
                const { email, code } = args.data;
                const otp = Number(code);
                const user = await models_1.User.findOne({ where: { email } });
                if (user && user.dataValues.email_verified) {
                    console.log('Email is already verified');
                    return {
                        success: true,
                        message: `User: ${user.dataValues.full_name} has already verified their email: ${user.dataValues.email}`
                    };
                }
                if (user && user.dataValues.otp === otp) {
                    await models_1.User.update({ email_verified: true, otp: null }, {
                        where: {
                            email
                        }
                    });
                    console.log('Email Verification Success');
                    return {
                        success: true,
                        message: `User: ${user.dataValues.full_name} has successfully verified their email: ${user.dataValues.email}`
                    };
                }
                if (user && user.dataValues.otp !== otp) {
                    console.log('The otp does not matches');
                    return {
                        success: false,
                        message: `The verification code does not match please re-enter the verification code`
                    };
                }
                else {
                    return {
                        success: false,
                        message: `No user found with the provide email ${email}`
                    };
                }
            }
            catch (error) {
                console.log(`Error while verifying email: ${error}`);
                return {
                    success: false,
                    message: ` Error: ${error}`
                };
            }
        },
        loginUser: async (parent, args) => {
            try {
                const { error } = validator_1.LoginSchema.validate(args.data);
                if (error)
                    throw error;
                const { email, password } = args.data;
                const user = await models_1.User.findOne({ where: { email } });
                if (user && !user.dataValues.email_verified) {
                    console.log('Email is not verified yet!!!');
                    return {
                        success: false,
                        message: `Email: ${email} is not verified yet please verify through code sent on your email`,
                    };
                }
                if (user && user.dataValues.email_verified) {
                    const isAuthorized = await bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.dataValues.password);
                    if (!isAuthorized) {
                        return {
                            success: false,
                            message: `Incorrect password`,
                        };
                    }
                    const issuedToken = (0, helpers_1.getJwtToken)(user.dataValues.id, user.dataValues.email);
                    return {
                        success: true,
                        message: `Email: ${email} is verified you can proceed to login now`,
                        user_id: user.dataValues.id || null,
                        token: issuedToken.token,
                        expiresIn: issuedToken.expiresIn
                    };
                }
                else {
                    return {
                        success: false,
                        message: `Email ${email} not registered`,
                    };
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: `Error: ${error}`,
                };
            }
        },
    }
};
