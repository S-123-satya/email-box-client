const {Router} = require('express');
const { postEmail } = require('../controllers/email-controller');
const router= Router();

router.post('',postEmail);
// router.post('/signup',postSignUp);
// router.post('/profile',profileController);
// router.get('',getUser);

module.exports=router;