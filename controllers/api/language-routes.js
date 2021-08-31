const router = require('express').Router();
const { Language } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res)=> {
    Language.findall()
    .then(dbLanguageData => res.json(dbLanguageData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/', withAuth, (req,res)=> {
    Language.create({
        language: req.body.language,
        post_id: require.body.post_id
    })
    .then(dbLanguageData => res.json(dbLanguageData))
    .catch(err =>{
        console.log(err);
    });
});

router.delete('/:id', withAuth, (req,res)=>{
    Language.destroy({
        where:{
            id: req.params.id
        }
    })
   .then(dbLanguageData =>{
       if(!dbLanugageData){
           res.status(404).json({ message:"No Language found!"});
           return;
       }
   res.json(dbLanguageData);
    }) 
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = Language;