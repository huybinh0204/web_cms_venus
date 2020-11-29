var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const axios = require('axios');
var JSESSIONID = require('./link/file')

/* GET home page. */
router.get('/', function (req, res, next) {
    axios.get('http://apihrm.dcv.vn/venus-service/departmentService/findAll', {
        headers: {
            'Cookie': JSESSIONID.checkJSESSIONID
        }
    })
        .then(function (response) {
            var questionk = response.data.lstDepartment;
            console.log("get du lieu thanh cong",);
            res.render('admin/question/index', {title: 'Phòng Ban', questionk: questionk});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
});
// View thêm mới
router.get('/add/', function (req, res, next) {
    res.render('admin/question/add', {title: 'Admin'});
});
router.post('/add-create', function (req, res, next) {
    var name = req.body.name;
    var description = req.body.description;
    axios.post('http://apihrm.dcv.vn/venus-service/departmentService/create',
        {
            name: name,
            description: description,
            companyId: 1111,
        }, {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
    )
        .then(function (response) {
            console.log("them phong ban thanh cong");
            res.redirect('/admin/question/');
        })
        .catch(function (error) {
            console.log(error);
        });
});
// View thêm Sửa lại
router.get('/edit/:departmentId', function (req, res, next) {
    var departmentId = req.params.departmentId;
    console.log("departmentId", departmentId);
    axios.get('http://apihrm.dcv.vn/venus-service/departmentService/findById?id=' + departmentId, {
        headers: {'Cookie': JSESSIONID.checkJSESSIONID}
    })
        .then(function (response) {
            var questionk = response.data.departmentEntity;
            console.log("get du lieu thanh cong", questionk);
            res.render('admin/question/edit', {title: 'Phòng Ban', edit_question: questionk});
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
});
router.post('/edit_create/:departmentId', function (req, res, next) {
    var departmentId = req.params.departmentId;
    var name = req.body.name;
    var description = req.body.description;
    var url = 'http://apihrm.dcv.vn/venus-service/departmentService/update';
    axios.put(url, {
            name: name,
            description: description,
            companyId: 1111,
            departmentId: departmentId
        },
        {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
    )
        .then(function (response) {
            console.log("put phong ban thanh cong");
            res.redirect('/admin/question/');
        })
        .catch(function (error) {
            console.log(error);
        });
    // var sql = `UPDATE question SET name="${name}" , title_name="${title_name}" WHERE id=${id}`;
    // console.log(sql);
    // db.query(sql, function (err, result) {
    //     if (err) {
    //         res.status(500).send({error: 'Somthing failed!'})
    //     }
    //     res.redirect('/admin/question/');
    // })
});
router.get('/delete/:departmentId', function (req, res, next) {
    var departmentId = req.params.departmentId;
    console.log("xoa", departmentId)
    res.redirect('/admin/question/');
    var url = 'http://apihrm.dcv.vn/venus-service/departmentService/delete?id=' + departmentId;
    axios.delete(url,
        {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
    )
        .then(function (response) {
            console.log("Xoa phong ban thanh cong");
            res.redirect('/admin/question/');
        })
        .catch(function (error) {
            console.log(error);
        });
})


module.exports = router;
