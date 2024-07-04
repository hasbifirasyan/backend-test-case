const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ message: "Eigen Library API is running" });
  });

module.exports = router;