import {Model} from 'sequelize'

export interface UserInstance extends Model {
    id: number,
    full_name: string,
    email: string,
    email_verified: boolean,
    otp: number,
    password: string,
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export interface UserSignupInterface {
    full_name: string,
    email: string,
    password: string,
}