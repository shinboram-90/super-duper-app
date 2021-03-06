const Post = require('../models/Post');
const User = require('../models/User');
const Like = require('../models/Like');
const fs = require('fs');

exports.getAllPosts = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const postList = await Post.findAll(postId);
    res.status(200).json({ postList: postList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getAllMyPosts = async (req, res, next) => {
  const myId = req.params.myId;
  try {
    const postList = await Post.findByMyId(myId);
    res.status(200).json({ myPosts: postList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ post: post });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.createPost = async (req, res, next) => {
  if (req.file) {
    const postBody = {
      user_id: req.auth.userId,
      title: req.body.title,
      content: req.body.content,
      status: 'published',
      image: `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
      }`,
    };
    try {
      const postCreated = await Post.create(postBody);
      if (postCreated) {
        const postId = postCreated.insertId;

        const post = await Post.findById(postId);
        res.status(201).json({ newPost: post });
      } else {
        res.status(401).json({ error: 'Query not completed' });
      }
    } catch (e) {
      res.status(403).json({ error: e });
    }
  } else {
    const postBody = {
      user_id: req.auth.userId,
      title: req.body.title,
      content: req.body.content,
      status: 'published',
    };

    try {
      const postCreated = await Post.create(postBody);
      if (postCreated) {
        const postId = postCreated.insertId;
        const post = await Post.findById(postId);
        res.status(201).json({ newPost: post });
      } else {
        res.status(401).json({ error: 'Query not completed' });
      }
    } catch (e) {
      res.status(403).json({ error: 'Marked fields cannot be empty' });
    }
  }
};

exports.modifyPost = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.auth.userId;

  // Retrieve post to be modified
  const getPost = await Post.findById(id);
  const image = getPost[0].image;

  // Retrieve role of the current user
  const role = await User.findAdmin(userId);

  if (getPost[0].user_id === userId || role === 'admin') {
    // Checking if post has an image
    if (req.file) {
      const postBody = {
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/uploads/${
          req.file.filename
        }`,
      };

      try {
        // Post already has one image, delete and replace
        if (image) {
          const filename = image.split('/uploads/')[1];
          fs.unlink(`uploads/${filename}`, async () => {
            const updatedPost = await Post.update(postBody, id);
            if (updatedPost) {
              const getFinalPost = await Post.findById(id);
              const post = getFinalPost[0];
              res.status(200).json({
                modifications: { id, post },
              });
            } else {
              res.status(404).json({ message: 'Cannot modify post infos' });
            }
          });
        } else {
          // Adding image to a post which has no file
          const updatedPost = await Post.update(postBody, id);
          if (updatedPost) {
            const getFinalPost = await Post.findById(id);
            const post = getFinalPost[0];
            res.status(200).json({
              modifications: { id, post },
            });
          } else {
            res.status(404).json({ message: 'Cannot modify post infos' });
          }
        }
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    } else {
      // Modifying text only
      const updatedPost = await Post.update(req.body, id);
      if (updatedPost) {
        const getFinalPost = await Post.findById(id);
        const post = getFinalPost[0];
        res.status(200).json({
          modifications: { id, post },
        });
      }
    }
  } else {
    // User is not the same or doesn't have the admin role
    return res
      .status(403)
      .json({ error: 'Unauthorized request, id not matching or not an admin' });
  }
};

exports.deletePost = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.auth.userId;
  try {
    const post = await Post.findById(id);
    if (!post[0]) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Retrieve role of the current user
    const role = await User.findAdmin(userId);

    // This line allows us to verify if the post's owner or an admin can delete the post
    if (post[0].user_id === userId || role === 'admin') {
      const image = post[0].image;
      if (image) {
        // loop to unlink all images
        const filename = await image.split('/uploads/')[1];

        fs.unlink(`uploads/${filename}`, async () => {
          const deletePost = await Post.delete(id);
          res.status(200).json({
            message: 'Post successfully deleted with image',
          });
        });
      } else {
        const deletePost = await Post.delete(id);
        return res.status(200).json({ message: 'Post successfully deleted' });
      }
    } else {
      return res.status(403).json({
        error: 'Unauthorized request, user id not matching or not an admin',
      });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

// <------------------- HANDLING LIKES ------------------->

exports.getLikes = async (req, res, next) => {
  try {
    const likes = await Like.getLikes();
    res.status(200).json({ totalLikes: likes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getLikesByPost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const likes = await Like.getLikesForOnePost(postId);
    res.status(200).json({ totalLikes: likes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.giveLike = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.body.user_id;

  const like = new Like({
    user_id: userId,
    post_id: postId,
    is_liked: 1,
  });

  try {
    // Need to find out if the user has already liked the post or not
    let findUserLike = await Like.findByUser(postId, userId);

    // The user hasn't liked any posts yet
    if (findUserLike.length !== 1) {
      try {
        findUserLike = await Like.create(like);
        res.status(200).json({ userFirstLike: findUserLike });
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      // Already liked/disliked one post, will update the boolean value
      try {
        findUserLike = await Like.likeUpdate(postId, userId);
        console.log(findUserLike);
        res.status(200).json({ userLike: findUserLike });
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
