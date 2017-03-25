const router = require('express').Router();
const io = require('socket.io')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: "Hello world!" });
});

module.exports = router;
