const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const searchPageRoutes = require('./search-page-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/search', searchPageRoutes);
router.use('/api', apiRoutes);

module.exports = router;
