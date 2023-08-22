import { Model } from "sequelize";

export interface LikeInterface extends Model{
    id: number,
    user_id:number,
    post_id:number,
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}