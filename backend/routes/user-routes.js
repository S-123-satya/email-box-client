const {Router} = require('express');
const { postLogin, postSignUp, getUser, profileVerifyController, profileController } = require('../controllers/user-controller');
const router= Router();

router.post('',postLogin);
router.post('/signup',postSignUp);
router.post('/profile',profileController);
router.get('/profile/verify/:uuid',profileVerifyController);
router.get('',getUser);

module.exports=router;