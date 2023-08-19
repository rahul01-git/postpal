import { Model } from "sequelize";

export interface ReplyInstance extends Model{
    id: number,
    user_id:number,
    comment_id:number,
    description:string,
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}