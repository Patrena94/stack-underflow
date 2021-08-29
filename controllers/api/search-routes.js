const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/topCommenters', (req, res) => {
    console.log('======================');
    User.findAll({
      attributes: [
          'id', 
          'username', 
          [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.user_id = user.id)'), 'num_comments']
        ],
      
      include:[{
          model: Comment,
          attributes:[],
          include: []
      }],
       order: [[sequelize.literal('num_comments','User.id'), 'DESC'], [sequelize.literal('User.id'), 'ASC']],
    }
    )
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/topCreators', (req, res) => {
    console.log('======================');
    User.findAll({
      attributes: [
          'id', 
          'username', 
          [sequelize.literal('(SELECT COUNT(*) FROM post WHERE post.user_id = user.id)'), 'num_posts']
        ],
      
      include:[{
          model: Post,
          attributes:[],
          include: []
      }],
       order: [[sequelize.literal('num_posts','User.id'), 'DESC'], [sequelize.literal('User.id'), 'ASC']],
    }
    )
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;