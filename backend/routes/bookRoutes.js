const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Book = require("../models/Book");

//creating book post
router.post("/", auth, async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const book = new Book({
      title,
      author,
      description,
      user: req.user.id,
    });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//getting book
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//updating book
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, author, description } = req.body;
    let book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, author, description },
      { new: true }
    );
    if (!book) return res.status(404).json({ msg: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//deleting book
router.delete("/:id", auth, async (req, res) => {
  try {
    let book = await Book.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!book) return res.status(404).json({ msg: "Book not found" });
    res.json({ msg: "Book deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
