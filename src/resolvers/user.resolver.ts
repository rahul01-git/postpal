import bcrypt from 'bcryptjs'

import { UserEmailVerifyInterface, UserLoginInterface, UserSignupInterface } from "../interfaces";
import { User } from "../models"
import { LoginSchema, registerSchema, verifyEmailSchema } from "../validator";
import { emailVerifyTemplate, sendEmail, getJwtToken } from '../helpers';


export const userResolver = {
  Query: {
    getAllUsers: async (_: PannerNode, { }) => {
      try {
        const allUsers = await User.findAll()
        return allUsers
      } catch (error) {
        console.log(`Error while retrieving all users: ${error}`);

      }
    }
  },

  Mutation: {

    registerUser: async (parent: ParentNode, args: { data: UserSignupInterface }) => {
      const { error } = registerSchema.validate(args.data)
      if (error) throw error

      const { full_name, email, password } = args.data
      const user = await User.findOne({ where: { email } })
      if (user) throw new Error(`Email:${email} already used`)

      try {
        const otp = Math.floor(100000 + Math.random() * 900000)
        const hashedPass = await bcrypt.hash(password, 12)
        const newUser = await User.create({
          full_name,
          email,
          otp,
          password: hashedPass
        })
        await sendEmail({
          to: email,
          subject: 'Verify Your Account',
          text: '',
          html: emailVerifyTemplate(otp)
        })
        return newUser
      } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Could not register user: ' + error);
      }
    },

    verifyEmail: async (parent: ParentNode, args: { data: UserEmailVerifyInterface }) => {
      try {
        const { error } = verifyEmailSchema.validate(args.data)
        if (error) throw error

        const { email, code } = args.data
        const otp = Number(code)
        const user = await User.findOne({ where: { email } })
        if (user && user.dataValues.email_verified) {
          console.log('Email is already verified');
          return {
            success: true,
            message: `User: ${user.dataValues.full_name} has already verified their email: ${user.dataValues.email}`
          }
        }
        if (user && user.dataValues.otp === otp) {
          await User.update(
            { email_verified: true, otp: null },
            {
              where: {
                email
              }
            }
          )
          console.log('Email Verification Success');
          return {
            success: true,
            message: `User: ${user.dataValues.full_name} has successfully verified their email: ${user.dataValues.email}`
          }
        }
        if (user && user.dataValues.otp !== otp) {
          console.log('The otp does not matches');
          return {
            success: false,
            message: `The verification code does not match please re-enter the verification code`
          }
        } else {
          return {
            success: false,
            message: `No user found with the provide email ${email}`
          }
        }

      } catch (error) {
        console.log(`Error while verifying email: ${error}`)
        return {
          success: false,
          message: ` Error: ${error}`
        }

      }
    },

    loginUser: async (parent: ParentNode, args: { data: UserLoginInterface }) => {
      try {
        const { error } = LoginSchema.validate(args.data)
        if (error) throw error

        const { email, password } = args.data
        const user = await User.findOne({ where: { email } })

        if (user && !user.dataValues.email_verified) {
          console.log('Email is not verified yet!!!');
          return {
            success: false,
            message: `Email: ${email} is not verified yet please verify through code sent on your email`,
          }
        }
        if (user && user.dataValues.email_verified) {
          const isAuthorized = await bcrypt.compare(password, user?.dataValues.password)

          if (!isAuthorized) {
            return {
              success: false,
              message: `Incorrect password`,
            }
          }

          const issuedToken = getJwtToken(user.dataValues.id, user.dataValues.email)
          return {
            success: true,
            message: `Email: ${email} is verified you can proceed to login now`,
            user_id: user.dataValues.id || null,
            token: issuedToken.token,
            expiresIn: issuedToken.expiresIn
          }
        } else {
          return {
            success: false,
            message: `Email ${email} not registered`,
          }

        }

      } catch (error) {
        return {
          success: false,
          message: `Error: ${error}`,
        }
      }
    },
  }
}