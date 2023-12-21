const {Router} = require('express');
const { postEmail, getEmails, getSentEmails,deleteEmail,updateEmail } = require('../controllers/email-controller');
const extractToken = require('../middleware/extractToken');
const router= Router();

router.post('', extractToken, postEmail);
router.get('', extractToken, getEmails);
router.delete('/:id', extractToken, deleteEmail);
router.put('/', extractToken, updateEmail);
router.get('/sent', extractToken, getSentEmails);
// router.post('/signup',postSignUp);
// router.post('/profile',profileController);
// router.get('',getUser);

module.exports=router;