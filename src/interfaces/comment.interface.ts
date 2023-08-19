import { Model } from "sequelize";

export interface CommentInstance extends Model{
    id: number,
    user_id:number,
    post_id:number,
    description:string,
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}