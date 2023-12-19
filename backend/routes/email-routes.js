const {Router} = require('express');
const { postEmail } = require('../controllers/email-controller');
const extractToken = require('../middleware/extractToken');
const router= Router();

router.post('', extractToken, postEmail);
// router.post('/signup',postSignUp);
// router.post('/profile',profileController);
// router.get('',getUser);

module.exports=router;