import Joi from 'joi'

export const registerSchema = Joi.object().keys({
    full_name: Joi.string().regex(/^[A-Za-z\s]+$/).required().label("Full Name").messages({
        'string.pattern.base': '{{#label}} must contain alphabetic characters only'
    }),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().min(4).max(12).label('Password')
})