const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");

router.get("/", (req, res) => {
  console.log("======================");
  res.render("search");
});

// get all users
router.get("/topCommenters", (req, res) => {
  console.log("======================");
  console.log("Search Top Commenters");
  User.findAll({
    attributes: [
      "id",
      "username",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM comment WHERE comment.user_id = user.id)"
        ),
        "num_comments",
      ],
    ],

    include: [
      {
        model: Comment,
        attributes: [],
        include: [],
      },
    ],
    order: [
      [sequelize.literal("num_comments"), "DESC"],
      [sequelize.literal("User.id"), "ASC"],
    ],
  })
    .then((dbCommentData) => {
      const topCommenters = dbCommentData.map((comment) =>
        comment.get({ plain: true })
      );
      console.log(topCommenters);
      res.render("search", {
       topCommenters,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/topCreators", (req, res) => {
  console.log("======================");
  console.log("Search Top Creators");
  User.findAll({
    attributes: [
      "id",
      "username",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM post WHERE post.user_id = user.id)"
        ),
        "num_posts",
      ],
    ],

    include: [
      {
        model: Post,
        attributes: [],
        include: [],
      },
    ],
    order: [
      [sequelize.literal("num_posts", "User.id"), "DESC"],
      [sequelize.literal("User.id"), "ASC"],
    ],
  })
    .then((dbPostData) => res.render("search"))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
