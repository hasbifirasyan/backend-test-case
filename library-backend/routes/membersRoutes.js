const MemberController = require("../controllers/memberController");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management and operations
 */

//Retrieves all existing members including the number of books borrowed by each member. 
router.get("/", MemberController.getAllMembers);

//Retrieves the details of a specific member including the number of books borrowed by the member.
router.get('/:id', MemberController.getMemberDetails);

//Allows a member to borrow a book.
router.post("/:id/borrow", MemberController.borrowBook);
// Allows a member to return a borrowed book.
router.post("/:id/return",  MemberController.returnBook);


module.exports = router;
