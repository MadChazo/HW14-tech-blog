const { Comment } = require("../models");

const commentData = [
  {
    comment_content: "Comment Content",
    post_id: 2,
    user_id: 1,
  },
  {
    comment_content: "Pretty basic post, but ok",
    post_id: 1,
    user_id: 2,
  },
  {
    comment_content: "Amazing post",
    post_id: 2,
    user_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
