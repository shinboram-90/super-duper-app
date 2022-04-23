const pool = require('../dbConnection');

const Post = function (post) {
  this.user_id = post.user_id;
  this.title = post.title;
  this.content = post.content;
  this.image = post.image;
  this.status = post.status;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Post.findAll = async () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT p.*, u.avatar, u.username, COUNT(c.id) as comments FROM posts p JOIN users u ON p.user_id = u.id LEFT JOIN comments c ON p.id = c.post_id WHERE p.status = "published" GROUP BY p.id ORDER BY p.created_at DESC',
      // 'SELECT p.*, u.avatar, u.username, COUNT(c.id) as comments, COUNT(l.id) as total_likes FROM posts p JOIN users u ON p.user_id = u.id LEFT JOIN comments c ON p.id = c.post_id LEFT JOIN likes l ON p.id = l.post_id WHERE p.status = "published" GROUP BY p.id ORDER BY p.created_at DESC',
      (err, posts) => {
        if (err) {
          return reject(err);
        }
        return resolve(posts);
      }
    );
  });
};

Post.create = async (newPost) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO posts SET ?', newPost, (err, res) => {
      if (err) {
        return reject(err);
      }

      console.log('New post succesfully published');
      return resolve(res);
    });
  });
};

Post.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT p.*, u.avatar, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id=? ORDER BY p.created_at DESC',
      id,
      (err, post) => {
        if (err) {
          return reject(err);
        }

        return resolve(post);
      }
    );
  });
};

Post.findByMyId = async (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT p.*, u.username, COUNT(c.id) as comments FROM posts p JOIN users u ON p.user_id = u.id LEFT JOIN comments c ON p.id = c.post_id WHERE p.status = "published" AND u.id = ? GROUP BY p.id ORDER BY p.created_at DESC',
      userId,
      (err, post) => {
        if (err) {
          return reject(err);
        }

        return resolve(post);
      }
    );
  });
};

Post.findByUsername = async (user) => {
  pool.query(
    'SELECT * FROM posts JOIN users on post.user_id = user.id WHERE user.username = ?',
    user.username,
    (err, postsByUsername) => {
      if (err) {
        return err;
      }
      console.log('All posts from a particular user' + postsByUsername);
      return resolve(postsByUsername);
    }
  );
};

Post.update = async (post, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE posts SET ? WHERE id=?`,
      [post, id],
      (err, updatedPost) => {
        if (err) {
          return reject(err);
        }
        console.log('Post updated infos:', updatedPost);
        return resolve(updatedPost);
      }
    );
  });
};

Post.delete = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM posts WHERE id=?', id, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(`Post with id no.${id} successfully deleted`);
      return resolve(res);
    });
  });
};

module.exports = Post;
