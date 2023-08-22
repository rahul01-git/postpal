import { MyContext } from "../helpers";
import { LikeInterface } from "../interfaces";
import { status } from '../helpers';
import { Like, Post, User } from "../models";
import { idValidator } from "../validator";

export const likeResolver = {
    Query: {
        getLikedPosts: async (parent: ParentNode, args: any, context: MyContext) => {
            try {
                if (!context.token) throw new Error('Authorization header missing')

                let allLikedPosts = await Like.findAll({ where: { user_id: context.user?.id } })

                if (!allLikedPosts || allLikedPosts.length === 0) {
                    throw new Error("User has not liked any posts yet")
                }

                return allLikedPosts;
            } catch (error) {
                console.log(error);
                throw new Error(`Error while retrieving all liked posts: ${error}`);
            }
        }
    },

    Like: {
        post: async (like: LikeInterface) => await Post.findByPk(like.post_id),
        user: async (like: LikeInterface) => await User.findByPk(like.user_id)
    },

    Mutation: {
        postToggleLike: async (parent: ParentNode, args: { post_id: number }, context: MyContext) => {
            try {
                if (!context.token) throw new Error('Authorization header missing')

                idValidator.validate(args.post_id)
                const existingLike = await Like.findOne({
                    where: { post_id: args.post_id, user_id: context.user?.id }
                })

                if (existingLike) {
                    if (existingLike.dataValues.is_liked === true) {
                        await existingLike.update({ is_liked: false })
                        const associatedPost = await Post.findByPk(args.post_id)
                        await associatedPost?.decrement('like_count', { by: 1 })
                        return {
                            status_code: status.success.okay,
                            is_liked: false,
                            message: `Like has been removed from Post ${args.post_id} `
                        }
                    }
                    await existingLike.update({ is_liked: true })
                    const associatedPost = await Post.findByPk(args.post_id)
                    associatedPost?.increment('like_count', { by: 1 })
                    return {
                        status_code: status.success.okay,
                        is_liked: false,
                        message: `Like has been added to Post ${args.post_id} `
                    }
                }

                const associatedPost = await Post.findByPk(args.post_id)
                if (!associatedPost) throw new Error(`No post available with id: ${args.post_id}`)

                await Like.create({
                    post_id: args.post_id,
                    user_id: context.user?.id
                })
                await associatedPost?.increment('like_count', { by: 1 })
                return {
                    status_code: status.success.okay,
                    is_liked: true,
                    message: `Like has been added to Post ${args.post_id} `
                }
            } catch (error) {
                console.log('Error adding new Like ' + error);
                return {
                    status_code: status.errors.badRequest,
                    message: `No post with id: ${args.post_id}` 
                }

            }
        }
    }

}