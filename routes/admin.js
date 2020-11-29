var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', function (req, res, next) {
    res.render('admin/index', {title: 'Admin'});
});

module.exports = router;
