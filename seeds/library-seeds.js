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
}
];
const seedLibrary = () => Library.bulkCreate(librarydata);

module.exports = seedLibrary;