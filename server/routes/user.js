const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');

const { auth, authAdmin } = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

// check user's input with validator
router.post(
  '/signup',
  validator.checkBody,
  validator.checkRules,
  userCtrl.signup
);
router.post('/login', userCtrl.login);

// Need authentification in order to do so
router.get('/profile', auth, userCtrl.getCurrentUser);
router.get('/logout', auth, userCtrl.logout);
router.get('/users', auth, userCtrl.getAllActive);
router.get('/users/:id', auth, userCtrl.getOneUser);
router.put(
  '/users/:id',
  auth,
  multer,
  validator.checkBody,
  validator.checkRules,
  userCtrl.modifyUser
);
router.delete('/users/:id', auth, userCtrl.deleteUser);

// Admin dashborad, for V2
router.put('/dashboard/users/:id', authAdmin, userCtrl.modifyStatus);
router.get('/dashboard', authAdmin, userCtrl.getAllUsers);

module.exports = router;
