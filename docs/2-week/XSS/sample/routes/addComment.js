var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function (req, res, next) {
  let nickname = req.query.nickname;
  let comment = req.query.comment;

  let resText = `${nickname}: ${comment}<br />`

  try{
    fs.appendFileSync(path.join(__dirname,'../chat.log'), resText, 'utf-8');
    console.log('OK');
    res.send("OK");
  }catch(e){
    console.log(e);
    res.send("ERROR");
  }
});

module.exports = router;
