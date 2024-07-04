const router = require("express").Router();
const membersRoutes = require("./membersRoutes");
const booksRoutes = require("./booksRoutes");

router.get("/", (req, res) => {
    res.json({ message: "Eigen Library API is running" });
  });

router.use("/members", membersRoutes);
router.use("/books", booksRoutes);

module.exports = router;