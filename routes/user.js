var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    var sql1 = "SELECT * FROM user";
    db.query(sql1, function(err, rows, fields) {
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.render('admin/user/index', { title: 'Tài khoản người dùng', usern:rows });
        // res.json(rows)
    })
    // res.render('admin/user/index', { title: '' });
});
// router.get('/admin/', function(req, res, next) {
//   res.render('admin/index', { title: 'Express' });
// });
// router.get('/edit_create/:id', function(req, res, next) {
//     var id = req.params.id;
//     var sql = `UPDATE user SET status="${status}" WHERE id=${id}`;
//     db.query(sql, function(err,result) {
//         if(err) {
//             res.status(500).send({ error: 'Something failed!' })
//         }
//         res.redirect('/admin/system_bulletin/');
//     });
// })
router.post('/edit_create/:id', function(req, res, next) {
    var id = req.params.id;
    var status = req.body.status;
    var sql = `UPDATE user SET status="${status}" WHERE id=${id}`;
    console.log(sql);
    db.query(sql, function(err, result) {
        if(err) {
            res.status(500).send({ error: 'Somthing failed!' })
        }
        res.redirect('/admin/user/');
    })
});
module.exports = router;
