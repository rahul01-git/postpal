import {Model} from 'sequelize'

export interface PostInterface extends Model {
    id: number,
    description: string,
    likes_count:number,
    user_id:number,
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}