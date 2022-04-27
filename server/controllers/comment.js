const Comment = require('../models/Comment');
const User = require('../models/User');

exports.getAllComments = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const commentList = await Comment.findByPost(postId);
    res.status(200).json({ commentList: commentList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.countComments = async (req, res, next) => {
  try {
    const counting = await Comment.countComments();
    res.status(200).json({ message: counting });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getAllCommentsUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const commentList = await Comment.findByUser(userId);
    res.status(200).json({ commentList: commentList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.createComment = async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  try {
    const commentBody = new Comment({
      content: req.body.content,
      user_id: req.auth.userId,
      post_id: postId,
      status: 'published',
    });

    const commentCreated = await Comment.create(commentBody);
    if (commentCreated) {
      const commentId = commentCreated.insertId;
      const comment = await Comment.findById(commentId);
      res.status(201).json({ newcomment: comment });
    } else {
      res.status(401).json({ error: 'Query not completed' });
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

// Fonctionality to be implemented for V2.
exports.modifyComment = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.auth.userId;

  const comment = await Comment.findById(id);
  const role = await User.findAdmin(userId);

  if (!comment[0]) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  if (comment[0].user_id === userId || role === 'admin') {
    const commentObject = {
      content: req.body.content,
    };

    try {
      const updatedComment = await Comment.update(commentObject, id);
      if (updatedComment) {
        res.status(200).json({
          modifications: req.body,
        });
      } else {
        res.status(404).json({ message: 'Cannot modify this comment' });
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  } else {
    return res
      .status(403)
      .json({ error: 'Unauthorized request, id not matching' });
  }
};

exports.deleteComment = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.auth.userId;
  try {
    const comment = await Comment.findById(id);
    const role = await User.findAdmin(userId);
    if (!comment[0]) {
      return res.status(404).json({ error: 'Comment not found' });

      // Comment's author or admin ?
    } else if (comment[0].user_id == userId || role === 'admin') {
      const deleteComment = await Comment.delete(id);
      if (deleteComment) {
        return res.status(200).json({
          message: 'Comment successfully deleted',
        });
      } else {
        res.status(404).json({ message: 'Cannot delete this comment.' });
      }
    } else {
      return res.status(403).json({
        error: 'Unauthorized request, not the author or not an admin',
      });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
