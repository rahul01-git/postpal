import Joi from 'joi'

export const registerSchema = Joi.object().keys({
    full_name: Joi.string().regex(/^[A-Za-z\s]+$/).required().label("Full Name").messages({
        'string.pattern.base': '{{#label}} must contain alphabetic characters only'
    }),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().min(4).max(12).label('Password')
})

export const verifyEmailSchema = Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    code: Joi.number().required().label("OTP")
})
export const LoginSchema = Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label('Password')
})
export const getPostByIdSchema = Joi.object().keys({
    post_id: Joi.number().required().label("Post id")
})

export const createPostValidator = Joi.object({
    description:  Joi.string().min(3).max(1000)
})

export const updatePostValidator = Joi.object({
    post_id: Joi.number().required().label("Post id"),
    description:  Joi.string().min(3).max(1000)
})
export const idValidator = Joi.object({
    post_id: Joi.number().required().label("Post id"),
})

export const postCommentValidator = Joi.object().keys({
    post_id: Joi.number().required().label("Post id"),
    description:  Joi.string().min(3).max(1000)
})

export const updateCommentValidator = Joi.object().keys({
    comment_id: Joi.number().required().label("Comment id"),
    description:  Joi.string().min(3).max(1000)
})
export const deleteCommentValidator = Joi.object().keys({
    id: Joi.number().required().label("Comment id"),
})