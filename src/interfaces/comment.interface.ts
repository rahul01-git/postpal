import { Model } from "sequelize";

export interface CommentInterface extends Model{
    post_id:number,
    description:string,
}

export interface UpdateCommentInterface {
    description: string,
    comment_id: number
}