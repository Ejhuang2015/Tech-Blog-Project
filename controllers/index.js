const router = require('express').Router();

const apiRoutes = require('./api');
const getRoutes = require('./getRoutes');

router.use('/', getRoutes);
router.use('/api', apiRoutes);

module.exports = router;