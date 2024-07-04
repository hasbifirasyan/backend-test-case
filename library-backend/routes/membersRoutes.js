const router = require("express").Router();

//Retrieves all existing members including the number of books borrowed by each member. 
router.get("/", (req, res) => {
  res.json({ message: "Get all members" });
});

//Allows a member to borrow a book.
router.post("/:id/borrow", (req, res) => {
  res.json({ message: "Borrow a book" });
});
// Allows a member to return a borrowed book.
router.post("/:id/return", (req, res) => {
  res.json({ message: "Return a book" });
});

module.exports = router;
