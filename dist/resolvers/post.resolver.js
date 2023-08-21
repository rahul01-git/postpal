"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const models_1 = require("../models");
exports.postResolver = {
    Query: {
        getAllPosts: async (parent, args, context) => {
            try {
                if (!context.user) {
                    throw new Error('Authorization Header missing');
                }
                const { page, size } = args.data;
                const offset = (page - 1) * size;
                let allPosts = await models_1.Post.findAll({
                    offset,
                    limit: size
                });
                return allPosts;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Error while retriving all posts: ${error}`);
            }
        }
    },
    Mutation: {}
};
