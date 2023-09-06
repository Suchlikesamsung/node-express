var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('hello world')
});
//2
module.exports = router;
