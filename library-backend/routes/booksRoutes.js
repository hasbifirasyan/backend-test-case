const router = require('express').Router()

//Shows all existing books and quantities. Books that are being borrowed are not counted)
router.get('/', (req, res) => {
  res.json({ message: 'Get all books' })
})
module.exports = router;
