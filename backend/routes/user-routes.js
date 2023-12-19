const {Router} = require('express');
const { postLogin, postSignUp, getUser, profileController } = require('../controllers/user-controller');
const router= Router();

router.get('/:email',getUser);
router.post('',postLogin);
router.post('/signup',postSignUp);
router.post('/profile',profileController);

module.exports=router;