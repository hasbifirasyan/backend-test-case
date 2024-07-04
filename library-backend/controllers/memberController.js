const { Member, Book, Borrow } = require("../models");
const { Op } = require("sequelize");

module.exports = class MemberController {
  /**
   * @swagger
   * /members:
   *   get:
   *     summary: Get all members
   *     tags: [Members]
   *     responses:
   *       200:
   *         description: List of all members
   *       500:
   *         description: Internal server error
   */
  static async getAllMembers(req, res, next) {
    try {
      const members = await Member.findAll();
      res.status(200).json(members);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /members/{id}:
   *   get:
   *     summary: Get member details
   *     tags: [Members]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Member ID
   *     responses:
   *       200:
   *         description: Member details
   *       404:
   *         description: Member not found
   *       500:
   *         description: Internal server error
   */
  static async getMemberDetails(req, res,next) {
    const memberId = req.params.id;

    try {
      const member = await Member.findByPk(memberId, {
        include: [
          {
            model: Borrow,
            include: [Book],
          },
        ],
      });

      if (!member) {
        throw {
          name: "NotFound",
          message: `Member with ID ${memberId} not found.`,
        };
      }

      const borrowedBooks = member.Borrows.filter(borrow => !borrow.returnDate).map(borrow => borrow.Book);
      res.status(200).json({ member, borrowedBooks,borrowedBooksCount: borrowedBooks.length});
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /members/{id}/borrow:
   *   post:
   *     summary: Borrow a book
   *     tags: [Members]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Member ID
   *       - in: body
   *         name: bookId
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - bookId
   *           properties:
   *             bookId:
   *               type: integer
   *     responses:
   *       200:
   *         description: Book borrowed successfully
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  static async borrowBook(req, res, next) {
    const memberId = req.params.id;
    const { bookId } = req.body;

    try {
      const member = await Member.findByPk(memberId);
      if (!member) {
        throw {
          name: "NotFound",
          message: `Member with ID ${memberId} not found.`,
        };
      }

      if (member.isPenalized) {
        throw {
          name: "BadRequest",
          message: "Member is currently penalized and unable to borrow the book for 3 days.",
        };
      }
      
      const borrowedBooks = await Borrow.count({
        where: {
          memberId: memberId,
          returnDate: null,
        },
      });

      if (borrowedBooks >= 2) {
        throw {
          name: "BadRequest",
          message: "Member may not borrow more than 2 books.",
        };
      }

      const existingBorrow = await Borrow.findOne({
        where: {
          bookId: bookId,
          returnDate: null,
        },
      });
  
      if (existingBorrow) {
        throw {
          name: "BadRequest",
          message: "Book is already borrowed by a member.",
        };
      }


      await Borrow.create({
        memberId: memberId,
        bookId: bookId,
        borrowDate: new Date(),
      });

      res.status(200).json({ message: "Book borrowed successfully" });
    } catch (error) {
      next(error);
    }
  }

   /**
   * @swagger
   * /members/{id}/return:
   *   post:
   *     summary: Return a book
   *     tags: [Members]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Member ID
   *       - in: body
   *         name: bookId
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - bookId
   *           properties:
   *             bookId:
   *               type: integer
   *     responses:
   *       200:
   *         description: Book returned successfully
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
   static async returnBook(req, res,next) {
    const memberId = req.params.id;
    const { bookId } = req.body;

    try {
      const borrow = await Borrow.findOne({
        where: {
          memberId: memberId,
          bookId: bookId,
          returnDate: null,
        },
      });

      if (!borrow) {
        throw {
          name: "BadRequest",
          message: "This book was not borrowed by the member",
        };
      }

      const borrowDate = new Date(borrow.borrowDate);
      const returnDate = new Date();
      const diffTime = Math.abs(returnDate - borrowDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 7) {
        await Member.update({ isPenalized: true }, { where: { id: memberId } });
      }

      borrow.returnDate = returnDate;
      await borrow.save();

      res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
      next(error);
    }
  }
};
