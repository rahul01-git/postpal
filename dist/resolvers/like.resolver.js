"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeResolver = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const validator_1 = require("../validator");
exports.likeResolver = {
    Query: {
        getLikedPosts: async (parent, args, context) => {
            var _a;
            try {
                if (!context.token)
                    throw new Error('Authorization header missing');
                let allLikedPosts = await models_1.Like.findAll({ where: { user_id: (_a = context.user) === null || _a === void 0 ? void 0 : _a.id } });
                if (!allLikedPosts || allLikedPosts.length === 0) {
                    throw new Error("User has not liked any posts yet");
                }
                return allLikedPosts;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Error while retrieving all liked posts: ${error}`);
            }
        }
    },
    Like: {
        post: async (like) => await models_1.Post.findByPk(like.post_id),
        user: async (like) => await models_1.User.findByPk(like.user_id)
    },
    Mutation: {
        postToggleLike: async (parent, args, context) => {
            var _a, _b;
            try {
                if (!context.token)
                    throw new Error('Authorization header missing');
                validator_1.idValidator.validate(args.post_id);
                const existingLike = await models_1.Like.findOne({
                    where: { post_id: args.post_id, user_id: (_a = context.user) === null || _a === void 0 ? void 0 : _a.id }
                });
                if (existingLike) {
                    if (existingLike.dataValues.is_liked === true) {
                        await existingLike.update({ is_liked: false });
                        const associatedPost = await models_1.Post.findByPk(args.post_id);
                        await (associatedPost === null || associatedPost === void 0 ? void 0 : associatedPost.decrement('like_count', { by: 1 }));
                        return {
                            status_code: helpers_1.status.success.okay,
                            is_liked: false,
                            message: `Like has been removed from Post ${args.post_id} `
                        };
                    }
                    await existingLike.update({ is_liked: true });
                    const associatedPost = await models_1.Post.findByPk(args.post_id);
                    associatedPost === null || associatedPost === void 0 ? void 0 : associatedPost.increment('like_count', { by: 1 });
                    return {
                        status_code: helpers_1.status.success.okay,
                        is_liked: false,
                        message: `Like has been added to Post ${args.post_id} `
                    };
                }
                const associatedPost = await models_1.Post.findByPk(args.post_id);
                if (!associatedPost)
                    throw new Error(`No post available with id: ${args.post_id}`);
                await models_1.Like.create({
                    post_id: args.post_id,
                    user_id: (_b = context.user) === null || _b === void 0 ? void 0 : _b.id
                });
                await (associatedPost === null || associatedPost === void 0 ? void 0 : associatedPost.increment('like_count', { by: 1 }));
                return {
                    status_code: helpers_1.status.success.okay,
                    is_liked: true,
                    message: `Like has been added to Post ${args.post_id} `
                };
            }
            catch (error) {
                console.log('Error adding new Like ' + error);
                return {
                    status_code: helpers_1.status.errors.badRequest,
                    message: `No post with id: ${args.post_id}`
                };
            }
        }
    }
};
