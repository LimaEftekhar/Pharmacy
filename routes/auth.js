const express = require ('express')
const router = express.Router()

const {login, register, logout} = require('../controllers/auth')
//Added this
const authMiddleware = require('../middleware/authentication');

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout);

//Added this route
router.get('/check-auth', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router