const { Post } = require("../models");

const postData = [
  {
    post_title: "Post Title",
    post_content: "Post Content",
    user_id: 1,
  },
  {
    post_title: "First Post",
    post_content: "New blog who dis?",
    user_id: 2,
  },
  {
    post_title: "Second Post",
    post_content: "Posting again, wow!",
    user_id: 2,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
