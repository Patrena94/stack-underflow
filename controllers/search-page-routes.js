

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote, Language } = require('../models');
const withAuth = require('../utils/auth');



// get all users
router.get('/topCommenters', withAuth, (req, res) => {
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
       order: [[sequelize.literal('num_comments'), 'DESC'], [sequelize.literal('user.id'), 'ASC']],
    }
    )
      .then(dbCommentData => {
        const topCommenters = dbCommentData.map(comment => comment.get({ plain: true }))
        res.render('search', {topCommenters ,loggedIn: req.session.loggedIn })})
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/topCreators', withAuth, (req, res) => {
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
       order: [[sequelize.literal('num_posts','user.id'), 'DESC'], [sequelize.literal('user.id'), 'ASC']],
    }
    )
      .then(dbPostData => {
        const topCreators = dbPostData.map(post => post.get({ plain: true }))
        res.render('search', {topCreators,loggedIn: req.session.loggedIn })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/usersPost/:userName', withAuth, (req, res) => {
  console.log('======================');

  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'language_name',
      'library_name',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        }
      },
      {
        model: User,
        attributes: ['username'],
        where:{username: req.params.userName}
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      
      res.render('search', { posts,loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('*', withAuth, (req,res)=>{
  console.log('======================');
  res.render('search', {loggedIn: req.session.loggedIn })
  
  
})
module.exports = router;