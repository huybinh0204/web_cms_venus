var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    var sql1 = "SELECT * FROM admin";
    db.query(sql1, function(err, rows, fields) {
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.render('admin/admin/index', { title: 'Tài khoản quản trị viên', adminn:rows });
        // res.json(rows)
    })
});
// View thêm mới
router.get('/add/', function (req, res, next) {
    res.render('admin/admin/add', {title: 'Admin'});
});
router.post('/add-create', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `INSERT INTO admin (username,password,lever) VALUES ("${username}","${password}",2)`;
    db.query(sql, function(err, result) {
        if(err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.redirect('/admin/admin/');
    })
});
// View thêm Sửa lại
router.get('/edit/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    var sql = `SELECT * FROM admin WHERE id=${id}`;
    db.query(sql, function(err, rows, fields) {
        if(err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.render('admin/admin/edit', {title: 'Admin', edit_admin:rows[0]});
        // res.render('admin/department/edit', {title: 'Admin'});
        // res.json(rows[0])
    })
// res.render('admin/department/edit', {title: 'Admin'});
});
router.post('/edit_create/:id', function(req, res, next) {
    var id = req.params.id;
    var username = req.body.username;
    var password = req.body.password;
    var sql = `UPDATE admin SET username="${username}" , password="${password}" WHERE id=${id} and lever >1`;
    console.log(sql);
    db.query(sql, function(err, result) {
        if(err) {
            res.status(500).send({ error: 'Somthing failed!' })
        }
        res.redirect('/admin/admin/');
    })
});
router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = `DELETE FROM admin WHERE id=${id} and lever>1`;
    db.query(sql, function(err,result) {
        if(err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.redirect('/admin/admin/');
    });
})

module.exports = router;
