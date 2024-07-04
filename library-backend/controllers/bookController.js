const { Book, Borrow } = require("../models");
module.exports = class BookController {
  /**
   * @swagger
   * /books:
   *   get:
   *     summary: Get all books
   *     tags: [Books]
   *     responses:
   *       200:
   *         description: List of all books
   *       500:
   *         description: Internal server error
   */

  static async getAllBooks(req, res, next) {
    try {
      const books = await Book.findAll({
        include: [
          {
            model: Borrow,
            where: { returnDate: null },
            required: false,
          },
        ],
      });

        const availableBooks = books.map(book => ({
          ...book.toJSON(),
          stock: book.stock - book.Borrows.length,
        }));
      res.status(200).json(availableBooks);
    } catch (error) {
      next(error);
    }
  }
};
