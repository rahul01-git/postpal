"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = exports.Comment = exports.Post = exports.User = void 0;
const index_1 = require("../index");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return index_1.User; } });
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return index_1.Post; } });
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return index_1.Comment; } });
Object.defineProperty(exports, "Reply", { enumerable: true, get: function () { return index_1.Reply; } });
// User and Post association
index_1.User.hasMany(index_1.Post, {
    foreignKey: 'user_id',
    as: 'posts',
});
index_1.Post.belongsTo(index_1.User, {
    foreignKey: 'user_id',
    as: 'user',
});
// User and Comment association
index_1.User.hasMany(index_1.Comment, {
    foreignKey: 'user_id',
    as: 'comments',
});
index_1.Comment.belongsTo(index_1.User, {
    foreignKey: 'user_id',
    as: 'user',
});
// Post and Comment association
index_1.Post.hasMany(index_1.Comment, {
    foreignKey: 'post_id',
    as: 'comments',
});
index_1.Comment.belongsTo(index_1.Post, {
    foreignKey: 'post_id',
    as: 'post',
});
// User and Reply association
index_1.User.hasMany(index_1.Reply, {
    foreignKey: 'user_id',
    as: 'replies',
});
index_1.Reply.belongsTo(index_1.User, {
    foreignKey: 'user_id',
    as: 'user',
});
// Comment and Reply association
index_1.Comment.hasMany(index_1.Reply, {
    foreignKey: 'comment_id',
    as: 'replies',
});
index_1.Reply.belongsTo(index_1.Comment, {
    foreignKey: 'comment_id',
    as: 'comment',
});
// User and Like association
index_1.User.hasOne(index_1.Like, {
    foreignKey: 'user_id',
    as: 'like',
});
index_1.Like.belongsTo(index_1.User, {
    foreignKey: 'user_id',
    as: 'user',
});
// Post and Like association
index_1.Post.hasMany(index_1.Like, {
    foreignKey: 'post_id',
    as: 'likes',
});
index_1.Like.belongsTo(index_1.Post, {
    foreignKey: 'post_id',
    as: 'post',
});
