"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentResolver = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const validator_1 = require("../validator");
exports.commentResolver = {
    Mutation: {
        createComment: async (parent, args, context) => {
            var _a;
            try {
                if (!context.token)
                    throw new Error('Authorization header is missing');
                validator_1.postCommentValidator.validate(args.data);
                const post = await models_1.Post.findByPk(args.data.post_id);
                if (!post)
                    throw new Error(`No post with id: ${args.data.post_id} exists`);
                const newComment = await models_1.Comment.create({
                    description: args.data.description,
                    post_id: args.data.post_id,
                    user_id: (_a = context.user) === null || _a === void 0 ? void 0 : _a.id
                });
                console.log("New comment created");
                return newComment;
            }
            catch (error) {
                console.error('Error adding new comment:', error);
                throw new Error(`Error adding new comment: ${error}`);
            }
        },
        updateComment: async (parent, args, context) => {
            var _a, _b;
            try {
                if (!context.token)
                    throw new Error("Authorization header is missing");
                validator_1.updateCommentValidator.validate(args.data);
                const { comment_id, description } = args.data;
                const comment = await models_1.Comment.findByPk(comment_id);
                if (!comment)
                    throw new Error(`No comment exists with id: ${comment_id}`);
                const updatedComment = await models_1.Comment.update({ description }, {
                    where: {
                        user_id: (_a = context.user) === null || _a === void 0 ? void 0 : _a.id,
                        id: comment_id
                    }
                });
                if (updatedComment[0] === 0) {
                    return {
                        status_code: helpers_1.status.errors.badRequest,
                        message: `user with id: ${(_b = context.user) === null || _b === void 0 ? void 0 : _b.id} is not authorized to update this post:${comment_id}`
                    };
                }
                else {
                    return {
                        status_code: helpers_1.status.success.okay,
                        message: `Comment with id ${comment_id} is updated successfully`
                    };
                }
            }
            catch (error) {
                console.error('Error updating comment:', error);
                throw new Error(`Error updating comment: ${error}`);
            }
        },
        deleteComment: async (parent, args, context) => {
            try {
                if (!context.user || !context.token) {
                    throw new Error("Authorization header missing");
                }
                validator_1.deleteCommentValidator.validate(args.id);
                const comment = await models_1.Comment.findByPk(args.id);
                const postId = comment === null || comment === void 0 ? void 0 : comment.dataValues.post_id;
                const post = await models_1.Post.findByPk(postId);
                //if post owner trying to delete
                if ((post === null || post === void 0 ? void 0 : post.dataValues.user_id) === context.user.id) {
                    await models_1.Comment.destroy({
                        where: {
                            id: args.id
                        }
                    });
                    return {
                        status_code: helpers_1.status.success.okay,
                        message: `Post Owner with id ${context.user.id} has successfully deleted comment with id ${args.id}`
                    };
                }
                //if commentator trying to delete the comment
                else if ((comment === null || comment === void 0 ? void 0 : comment.dataValues.user_id) === context.user.id) {
                    await models_1.Comment.destroy({
                        where: {
                            id: args.id,
                            user_id: context.user.id
                        }
                    });
                    return {
                        status_code: helpers_1.status.success.okay,
                        message: `Commentator(user) ${context.user.id} has successfully deleted their comment ${args.id} on post comment ${comment === null || comment === void 0 ? void 0 : comment.dataValues.post_idm}`
                    };
                }
                else {
                    return {
                        status_code: helpers_1.status.errors.badRequest,
                        message: `Sorry you are not authorized to delete comment ${args.id}`
                    };
                }
            }
            catch (error) {
                console.log(`Error while deleting the comment: ${error}`);
                throw new Error(`Error while deleting the comment: ${error} `);
            }
        }
    }
};
