const BookController = require("../controllers/bookController");
const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Shows all existing books and quantities
 */

//Shows all existing books and quantities. Books that are being borrowed are not counted)
router.get("/", BookController.getAllBooks);

module.exports = router;
