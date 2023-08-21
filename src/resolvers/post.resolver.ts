import { MyContext } from "../helpers";
import { GetAllPostInterface } from "../interfaces";
import { Post } from "../models";

export const postResolver = {
    Query: {
        getAllPosts: async (parent: ParentNode, args: { data: GetAllPostInterface }, context: MyContext) => {
            try {
                if(!context.user){
                    throw new Error('Authorization Header missing')
                }
                const {page, size} = args.data
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
        }
    },
    Mutation: {

    }
}