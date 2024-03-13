const router = require('express').Router();
const userRoutes = require('./user_routes');
const thoughtRoutes = require('./thought_routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;