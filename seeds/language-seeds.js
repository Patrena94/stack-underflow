const {Language} = require('../models');

const languagedata=[
    {
        id: 1,
        Language: 'JavaScript'
    },
        {
        id: 2 ,
        Language: 'HTML'
    },
        {
        id: 3,
        Language: 'css'
    }  
];
const seedLanguages = () => Vote.bulkCreate(languagedata);

module.exports = seedLanguages;