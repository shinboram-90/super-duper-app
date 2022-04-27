const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/profile/:myId', auth, postCtrl.getAllMyPosts);

router.get('/posts', auth, postCtrl.getAllPosts);
router.get('/posts/:id', auth, postCtrl.getOnePost);

router.post('/posts', auth, multer, postCtrl.createPost);
router.put('/posts/:id', auth, multer, postCtrl.modifyPost);
router.delete('/posts/:id', auth, postCtrl.deletePost);

// Likes to be implemented in V2
router.get('/postslikes', auth, postCtrl.getLikes);
router.get('/posts/:id/likes', auth, postCtrl.getLikesByPost);
router.post('/posts/:id/likes', auth, postCtrl.giveLike);

module.exports = router;
