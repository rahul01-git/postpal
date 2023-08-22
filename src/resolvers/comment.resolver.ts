import { MyContext, status } from "../helpers";
import { CommentInterface, UpdateCommentInterface } from "../interfaces";
import { Comment, Post } from "../models";
import { deleteCommentValidator, postCommentValidator, updateCommentValidator } from "../validator";

export const commentResolver = {
    Mutation: {
        createComment: async (parent: ParentNode, args: { data: CommentInterface }, context: MyContext) => {
            try {
                if (!context.token) throw new Error('Authorization header is missing')

                postCommentValidator.validate(args.data)

                const post = await Post.findByPk(args.data.post_id)
                if (!post) throw new Error(`No post with id: ${args.data.post_id} exists`)

                const newComment = await Comment.create({
                    description: args.data.description,
                    post_id: args.data.post_id,
                    user_id: context.user?.id
                })
                console.log("New comment created")
                return newComment
            } catch (error) {
                console.error('Error adding new comment:', error);
                throw new Error(`Error adding new comment: ${error}`)

            }
        },
        updateComment: async (parent: ParentNode, args: { data: UpdateCommentInterface }, context: MyContext) => {
            try {
                if (!context.token) throw new Error("Authorization header is missing")

                updateCommentValidator.validate(args.data)

                const { comment_id, description } = args.data

                const comment = await Comment.findByPk(comment_id)
                if (!comment) throw new Error(`No comment exists with id: ${comment_id}`)

                const updatedComment = await Comment.update({ description }, {
                    where: {
                        user_id: context.user?.id,
                        id: comment_id
                    }
                })

                if (updatedComment[0] === 0) {
                    return {
                        status_code: status.errors.badRequest,
                        message: `user with id: ${context.user?.id} is not authorized to update this post:${comment_id}`
                    }

                } else {

                    return {
                        status_code: status.success.okay,
                        message: `Comment with id ${comment_id} is updated successfully`
                    }
                }
            } catch (error) {
                console.error('Error updating comment:', error);
                throw new Error(`Error updating comment: ${error}`)
            }
        },
        deleteComment: async (parent: ParentNode, args: { id: number }, context: MyContext) => {
            try {
                if (!context.user || !context.token) {
                    throw new Error("Authorization header missing");
                }

                deleteCommentValidator.validate(args.id)
                const comment = await Comment.findByPk(args.id)
                const postId = comment?.dataValues.post_id
                const post = await Post.findByPk(postId)

                //if post owner trying to delete
                if (post?.dataValues.user_id === context.user.id) {
                    await Comment.destroy({
                        where: {
                            id: args.id
                        }
                    })
                    return {
                        status_code: status.success.okay,
                        message: `Post Owner with id ${context.user.id} has successfully deleted comment with id ${args.id}`
                    }
                }

                //if commentator trying to delete the comment
                else if (comment?.dataValues.user_id === context.user.id) {
                    await Comment.destroy({
                        where: {
                            id: args.id,
                            user_id: context.user.id
                        }
                    })

                    return {
                        status_code: status.success.okay,
                        message: `Commentator(user) ${context.user.id} has successfully deleted their comment ${args.id} on post comment ${comment?.dataValues.post_idm}`
                    }
                } else {
                    return {
                        status_code: status.errors.badRequest,
                        message: `Sorry you are not authorized to delete comment ${args.id}`
                    }
                }
            } catch (error) {
                console.log(`Error while deleting the comment: ${error}`);
                throw new Error(`Error while deleting the comment: ${error} `);

            }


        }
    }
}