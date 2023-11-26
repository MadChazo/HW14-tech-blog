const router = require("express").Router();
const { Post } = require("../models");

// Get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Post.findAll();
    const posts = dbBlogData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get user posts for dashboard
router.get("/dashboard/:user", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    if (req.params.user !== req.session.user) {
      res.redirect("/");
      return;
    }
    const dbBlogData = await Post.findAll({
      where: { user_id: req.params.user },
    });
    const posts = dbBlogData.get({ plain: true });
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Sign up route
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
