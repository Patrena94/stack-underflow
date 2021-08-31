const {Library} = require ('../models');

const librarydata =[

{
id: 1,
library_name: 'Node',
language_id: 1
},
{
id: 2,
library_name: 'handlebar',
language_id: 3
},
{
    id: 3,
    library_name: 'express',
    language_id: 4
},
{
        id: 4,
        library_name: 'MysQL',
        language_id: 2
        }   
];
const seedLibrary = () => Library.bulkCreate(librarydata);

module.exports = seedLibrary;