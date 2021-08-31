const {Language} = require('../models');

const languagedata=[
    {
        id: 1,
        language_name: 'JavaScript'
    },
        {
        id: 2 ,
        language_name: 'HTML'
    },
        {
        id: 3,
        language_name: 'css'
    },  
{
id: 4,
language_name:'php'
}
];
const seedLanguages = () => Language.bulkCreate(languagedata);

module.exports = seedLanguages;