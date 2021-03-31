// Dependencies
// =============================================================
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Image = require('./Image');

// Joins
// =============================================================
// A user can have many posts but a post can only have one user
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// A user can have many comments but a comment can only have one user
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// A post can have many comments but the comment can only be in one post.
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// A post can have many comments but the comment can only be in one post.
Post.hasOne(Image, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Image.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Export
// =============================================================
module.exports = { User, Post, Comment };
