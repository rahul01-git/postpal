"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const models_1 = require("../models");
const validator_1 = require("../validator");
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
        },
        getPostById: async (parent, args, context) => {
            try {
                if (!context.user) {
                    throw new Error('Authorization Header missing');
                }
                const { error } = validator_1.getPostByIdSchema.validate({ post_id: args.post_id });
                if (error)
                    throw error;
                const post = await models_1.Post.findByPk(Number(args.post_id));
                if (post) {
                    const data = await models_1.Like.findOne({
                        where: {
                            user_id: context.user.id,
                            post_id: post.dataValues.id,
                            is_liked: true
                        }
                    });
                    if (data) {
                        const liked_info = post.dataValues;
                        liked_info.is_liked = true;
                        return liked_info;
                    }
                    else {
                        const liked_info = post.dataValues;
                        liked_info.is_liked = false;
                        return liked_info;
                    }
                }
                return post;
            }
            catch (error) {
                console.log(`Error while retrieving post by id ${args.post_id}: ${error}`);
                throw new Error(`Error while retrieving post by id ${args.post_id}: ${error}`);
            }
        },
        getMyPosts: async (parent, args, context) => {
            var _a, _b;
            try {
                if (!context.user)
                    throw new Error('Authorization header is required');
                const ownPosts = await models_1.Post.findAll({ where: { user_id: (_a = context.user) === null || _a === void 0 ? void 0 : _a.id } });
                const dataValue = [];
                if (!ownPosts)
                    return [];
                if (ownPosts) {
                    for (let i = 0; i < ownPosts.length; i++) {
                        const data = await models_1.Like.findOne({
                            where: {
                                user_id: (_b = context.user) === null || _b === void 0 ? void 0 : _b.id,
                                post_id: ownPosts[i].dataValues.id,
                                is_liked: true
                            }
                        });
                        if (data) {
                            ownPosts[i].dataValues.is_liked = true;
                            dataValue.push(ownPosts[i].dataValues);
                        }
                        else {
                            ownPosts[i].dataValues.is_liked = false;
                            dataValue.push(ownPosts[i].dataValues);
                        }
                    }
                }
                return dataValue;
            }
            catch (error) {
                console.log(`Error while fetching own posts: ${error}`);
                throw new Error(`Error while fetching own posts: ${error}`);
            }
        }
    },
    Post: {
        user: async (post) => await models_1.User.findByPk(post.user_id)
    },
    Mutation: {
        createPost: async (parent, args, context) => {
            var _a;
            try {
                if (!context.user)
                    throw new Error('Authorization header is required');
                const { error } = validator_1.createPostValidator.validate(args.data);
                if (error)
                    throw error;
                const { description } = args.data;
                const newPost = await models_1.Post.create({
                    description,
                    user_id: (_a = context.user) === null || _a === void 0 ? void 0 : _a.id
                });
                return newPost;
            }
            catch (error) {
                console.error('Error adding new post: ', error);
                return error;
            }
        }
    }
};
