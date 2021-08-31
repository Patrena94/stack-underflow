const router = require('express').Router();
const { Library } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Library.findAll()
      .then(dbLibraryData => res.json(dbLibraryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post('/', withAuth, (req, res) => {
    
    Library.create({
      Library_name: req.body.Library_name,
      language_id: req.body.language_id,
    })
      .then(dbLibraryData => res.json(dbLibraryData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
  
  router.delete('/:id', withAuth, (req, res) => {
    Library.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbLibraryData => {
        if (!dbLibraryData) {
          res.status(404).json({ message: 'No Library found with this id!' });
          return;
        }
        res.json(dbLibraryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = library;
  