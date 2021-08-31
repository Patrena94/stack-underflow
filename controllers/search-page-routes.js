

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote, Language } = require('../models');


router.get('/', (req,res)=>{
    console.log('======================');
    res.render('search')
    
    
})

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
       order: [[sequelize.literal('num_comments'), 'DESC'], [sequelize.literal('User.id'), 'ASC']],
    }
    )
      .then(dbCommentData => {
        const topCommenters = dbCommentData.map(comment => comment.get({ plain: true }))
        res.render('search', {topCommenters})})
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
      .then(dbPostData => {
        const topCreators = dbPostData.map(post => post.get({ plain: true }))
        res.render('search', {topCreators})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/usersPost/:userName', (req, res) => {
  console.log('======================');

  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'language_name',
      'library_name',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'language_id', 'library_id', 'created_at'],
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

module.exports = router;