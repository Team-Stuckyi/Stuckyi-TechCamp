var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function (req, res, next) {
    const data = fs.readFileSync(path.join(__dirname,'../chat.log'), 'utf-8');
    res.send("<h1>게시판</h1>" + data);
});

module.exports = router;
