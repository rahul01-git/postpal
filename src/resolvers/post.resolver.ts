import { MyContext } from "../helpers";
import { GetAllPostInterface, PostInterface } from "../interfaces";
import { Like, Post } from "../models";
import { getPostByIdSchema } from "../validator";

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

                return allPosts
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
    Mutation: {

    }
}