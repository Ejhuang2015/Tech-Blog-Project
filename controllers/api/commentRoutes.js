// Dependencies
// =============================================================
const router = require('express').Router();
const { Comment } = require('../../models');

// Get (Read)
// =============================================================
router.get('/:id', async (req, res) => {
  try {
    // Get the specific post's data
    const commentData = await Comment.findByPk(req.params.id);
    // Convert commentData into a more readable format
    const comments = commentData.get({ plain: true });
    res.status(200).json(comments);
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
    // Create a new comment 
    const newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Put (Update)
// =============================================================
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "Comment not found!" });
      return;
    }
    res.status(200).json(commentData ? "Comment updated!" : "Failed to update comment");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete (Delete)
// =============================================================
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "Comment not found!" });
      return;
    }
    res.status(200).json(commentData ? "Comment deleted!" : "Failed to delete comment");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
// =============================================================
module.exports = router;