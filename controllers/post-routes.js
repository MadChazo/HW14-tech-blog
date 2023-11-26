const router = require("express").Router();
const { Post, Comment } = require("../models");

// Get one post
router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    res.render("post", {
      post,
      loggedIn: req.session.loggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// New post
router.post("/", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    const newPost = await Post.create({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      user_id: req.session.user,
    });
    res.status(200).json(newPost);
    res.redirect(`/dashboard/${req.session.user}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get post editor
router.get("/:id/edit", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    const dbPostData = await Post.findbyPk(req.params.id);
    if (dbPostData.user_id !== req.session.user) {
      res.redirect(`/post/${dbPostData.id}`);
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render("edit", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit post
router.put("/:id/edit", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    const dbPostData = await Post.findbyPk(req.params.id);
    if (dbPostData.user_id !== req.session.user) {
      res.redirect(`/post/${dbPostData.id}`);
      return;
    }
    const updatedPost = await Post.update(
      {
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        user_id: req.session.user,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updatedPost);
    res.redirect(`/dashboard/${req.session.user}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    const dbPostData = await Post.findbyPk(req.params.id);
    if (dbPostData.user_id !== req.session.user) {
      res.redirect(`/post/${dbPostData.id}`);
      return;
    }
    const deletedPost = await Post.destroy({ where: { id: req.params.id } });
    res.status(200).json(deletedPost);
    res.redirect(`/dashboard/${req.session.user}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/:id/comment", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    const newComment = await Comment.create({
      comment_content: req.body.comment_content,
      post_id: req.params.id,
      user_id: req.session.user,
    });
    res.status(200).json(newComment);
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
