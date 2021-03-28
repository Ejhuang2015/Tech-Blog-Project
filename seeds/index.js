const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("---- Sync Successful ----");
  
  await User.bulkCreate(userData);
  console.log("---- Users Seeded ----");
  await Post.bulkCreate(postData);
  console.log("---- Posts Seeded ----");
  await Comment.bulkCreate(commentData);
  console.log("---- Comments Seeded ----");
  
  process.exit(0);
};

seedDatabase();