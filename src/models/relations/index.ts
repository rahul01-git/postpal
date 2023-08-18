import {User, Post, Like, Comment, Reply} from '../index'

// User and Post association
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'posts',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// User and Comment association
User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comments',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// Post and Comment association
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post',
});

// User and Reply association
User.hasMany(Reply, {
  foreignKey: 'user_id',
  as: 'replies',
});

Reply.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// Comment and Reply association
Comment.hasMany(Reply, {
  foreignKey: 'comment_id',
  as: 'replies',
});

Reply.belongsTo(Comment, {
  foreignKey: 'comment_id',
  as: 'comment',
});

// User and Like association
User.hasOne(Like, {
  foreignKey: 'user_id',
  as: 'like',
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// Post and Like association
Post.hasMany(Like, {
  foreignKey: 'post_id',
  as: 'likes',
});

Like.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post',
});


export { User, Post, Comment, Reply };
