var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createpoll', (req, res, next) => {
	res.render('createpoll');
});

module.exports = router;
