const router = require('express').Router();
const io = require('socket.io')

/* GET home page. */

const stocknames = []
router.get('/', function(req, res, next) {
  res.json({ name: stocknames });
});

router.post('/', (req, res, next) => {
  var newStock = req.body.stockname
  stocknames.push(newStock)
  res.json({ name: stocknames })
})

module.exports = router;
