import bcrypt from 'bcryptjs'

import { UserEmailVerifyInterface, UserInstance, UserSignupInterface } from "../interfaces";
import { User } from "../models"
import { registerSchema, verifyEmailSchema } from "../validator";
import { emailVerifyTemplate, sendEmail } from '../helpers/nodemailer';


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
    }
  }
}