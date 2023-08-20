import bcrypt from 'bcryptjs'

import { UserInstance, UserSignupInterface } from "../interfaces";
import { User } from "../models"
import { registerSchema } from "../validator";
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
        const hashedPass = await bcrypt.hash(password,12)
        const newUser = await User.create({
          full_name,
          email,
          otp,
          password:hashedPass
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
        throw new Error('Could not register user: '+error);
      }
    }
  }
}