import { MyContext } from "../helpers";
import { GetAllPostInterface, PostInterface, UpdatePostInterface, UserInterface } from "../interfaces";
import { Like, Post, User } from "../models";
import { createPostValidator, getPostByIdSchema, idValidator, updatePostValidator } from "../validator";
import { status } from '../helpers';


export const postResolver = {
    Query: {
        getAllPosts: async (parent: ParentNode, args: { data: GetAllPostInterface }, context: MyContext) => {
            try {
                if (!context.user) {
                    throw new Error('Authorization Header missing')
                }
                const { page, size } = args.data
                const offset = (page - 1) * size

                let allPosts = await Post.findAll({
                    offset,
                    limit: size
                })

                const dataValue = [];
                for (let i = 0; i < allPosts.length; i++) {
                    const data = await Like.findOne({
                        where: {
                            user_id: context.user.id,
                            post_id: allPosts[i].dataValues.id,
                            is_liked: true
                        }
                    });
                    if (data) {
                        allPosts[i].dataValues.is_liked = true;
                        dataValue.push(allPosts[i].dataValues)
                    }
                    else {
                        allPosts[i].dataValues.is_liked = false;
                        dataValue.push(allPosts[i].dataValues)
                    }
                }
                return dataValue


            } catch (error) {
                console.log(error)
                throw new Error(`Error while retriving all posts: ${error}`)
            }
        },
        getPostById: async (parent: ParentNode, args: { post_id: number }, context: MyContext) => {
            try {
                if (!context.user) {
                    throw new Error('Authorization Header missing')
                }

                const { error } = getPostByIdSchema.validate({ post_id: args.post_id });
                if (error) throw error


                const post = await Post.findByPk(Number(args.post_id))
                if (post) {
                    const data = await Like.findOne({
                        where: {
                            user_id: context.user.id,
                            post_id: post.dataValues.id,
                            is_liked: true
                        }
                    })

                    if (data) {
                        const liked_info = post.dataValues
                        liked_info.is_liked = true
                        return liked_info
                    } else {
                        const liked_info = post.dataValues
                        liked_info.is_liked = false
                        return liked_info
                    }
                }
                return post
            } catch (error) {
                console.log(`Error while retrieving post by id ${args.post_id}: ${error}`);
                throw new Error(`Error while retrieving post by id ${args.post_id}: ${error}`);
            }

        },
        getMyPosts: async (parent: ParentNode, args: {}, context: MyContext) => {
            try {
                if (!context.user) throw new Error('Authorization header is required')

                const ownPosts = await Post.findAll({ where: { user_id: context.user?.id } })

                const dataValue = []
                if (!ownPosts) return []
                if (ownPosts) {
                    for (let i = 0; i < ownPosts.length; i++) {
                        const data = await Like.findOne({
                            where: {
                                user_id: context.user?.id,
                                post_id: ownPosts[i].dataValues.id,
                                is_liked: true
                            }
                        });
                        if (data) {
                            ownPosts[i].dataValues.is_liked = true;
                            dataValue.push(ownPosts[i].dataValues)
                        }
                        else {
                            ownPosts[i].dataValues.is_liked = false;
                            dataValue.push(ownPosts[i].dataValues)
                        }
                    }
                }
                return dataValue;

            } catch (error) {
                console.log(`Error while fetching own posts: ${error}`);
                throw new Error(`Error while fetching own posts: ${error}`);

            }
        }
    },
    Post: {
        user: async (post: PostInterface) => await User.findByPk(post.user_id)
    },

    Mutation: {
        createPost: async (parent: ParentNode, args: { data: PostInterface }, context: MyContext) => {

            try {
                if (!context.user) throw new Error('Authorization header is required')

                const { error } = createPostValidator.validate(args.data);
                if (error) throw error
                

                const { description } = args.data
                const newPost = await Post.create({
                    description,
                    user_id: context.user?.id
                })
                return newPost
            } catch (error) {
                console.error('Error adding new post: ', error)
                return error
            }
        },
        updatePost: async (parent: ParentNode, args: { data: UpdatePostInterface }, context: MyContext) => {
            try {
                if (!context.user) throw new Error('Authorization header is required')

                const { error } = updatePostValidator.validate(args.data);
                if (error) throw error


                const { description, post_id } = args.data
                await Post.update({ description }, {
                    where: {
                        id: post_id
                    }
                })

                return {
                    status_code: status.success.okay,
                    message: `Post with id ${post_id} is updated successfully`
                }

            } catch (error) {
                console.log(`Error while updating post: ${error}`);
                throw new Error(`Error while updating the post: ${error}`);

            }
        },
        deletePost: async (parent: ParentNode, args: { post_id: number }, context: MyContext) => {
            try {
                if (!context.user) throw new Error('Authorization header is required')

                const { error } = idValidator.validate({
                    post_id: args.post_id
                });
                if (error) throw error


                const deletedPost = await Post.destroy({
                    where: { id: args.post_id, user_id: context.user.id }
                })

                if (!deletedPost) throw new Error(`Sorry either the post doesn't exists or you are not the owner of post with id: ${args.post_id}`);

                return {
                    status_code: status.success.okay,
                    message: `Post with id ${args.post_id} is deleted successfully`
                }

            } catch (error) {
                throw new Error(`Error while deleting the post: ${error}`);
            }
        }
    }
}