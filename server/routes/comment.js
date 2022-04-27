const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/posts/:postId/comments/', auth, commentCtrl.getAllComments);
router.post('/posts/:postId/comments/', auth, commentCtrl.createComment);
router.put('/posts/:postId/comments/:id', auth, commentCtrl.modifyComment);
router.delete('/posts/:postId/comments/:id', auth, commentCtrl.deleteComment);

module.exports = router;
