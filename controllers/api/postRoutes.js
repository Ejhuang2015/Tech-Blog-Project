// Dependencies
// =============================================================
const router = require('express').Router();
const { Post } = require('../../models');

// Get (Read)
// =============================================================
router.get('/:id', async (req, res) => {
  try {
    // Get the specific post's data
    const postData = await Post.findByPk(req.params.id);
    // Convert postData into a more readable format
    const posts = postData.get({ plain: true });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post (Create)
// =============================================================
router.post('/', async (req, res) => {
  try {
    // Grab the current user's id and append it to the payload
    req.body.user_id = req.user.id;
    // Create a new post 
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Put (Update)
// =============================================================
router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "Post not found!" });
      return;
    }
    res.status(200).json(postData ? "Post updated!" : "Failed to update post");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete (Delete)
// =============================================================
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "Post not found!" });
      return;
    }
    res.status(200).json(postData ? "Post deleted!" : "Failed to delete post");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
// =============================================================
module.exports = router;