var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const axios = require('axios');
var JSESSIONID = require('./link/file')
//"roleId": 3, mói có quyền tạo tài khaon
/* GET home page. */
router.get('/', function (req, res, next) {
    axios.post('http://apihrm.dcv.vn/venus-service/employeeService/filter', {
        companyId: 1111,
        employeeId: 2464
    }, {
        headers: {'Cookie': JSESSIONID.checkJSESSIONID}
    })
        .then(function (response) {
            var questionk = response.data.lstEmployee;
            console.log("get thanh cong",);
            res.render('admin/message_icon/index', {title: 'Quản lý nhân viên', lstEmployee: questionk});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
        });
});
// View thêm mới
router.get('/add/', function (req, res, next) {
    res.render('admin/message_icon/add', {title: 'Admin'});
});
router.post('/add-create', function (req, res, next) {
    var name = req.body.name;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;
    var dob = req.body.dob;
    var roleId = 1;
    var companyId = 1111;
    axios.post('http://apihrm.dcv.vn/venus-service/employeeService/create',
        {
            name: name,
            address: address,
            email: email,
            phone: phone,
            dob: dob,
            roleId: roleId,
            companyId: companyId,
        }, {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
    )
        .then(function (response) {
            console.log("Tâo moi nv");
            res.redirect('/admin/message_icon/');
        })
        .catch(function (error) {
            console.log(error);
        });
});
// View thêm Sửa lại
router.get('/edit/:employeeId', function (req, res, next) {
    var employeeId = req.params.employeeId;
    console.log("employeeId", employeeId);
    axios.get('http://apihrm.dcv.vn/venus-service/employeeService/findById?id=' + employeeId, {
        headers: {'Cookie': JSESSIONID.checkJSESSIONID}
    })
        .then(function (response) {
            var questionk = response.data.employeeEntity;
            console.log("get du lieu thanh cong", questionk);
            res.render('admin/message_icon/edit', {title: 'Phòng Ban', edit_employeeId: questionk});
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
});
router.post('/edit_create/:employeeId', function (req, res, next) {
    var name = req.body.name;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;
    var dob = req.body.dob;
    var roleId = 1;
    var companyId = 1111;
    var url = 'http://apihrm.dcv.vn/venus-service/employeeService/update';
    axios.put(url, {
            name: name,
            address: address,
            email: email,
            phone: phone,
            dob: dob,
            roleId: roleId,
            companyId: companyId,
        },
        {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
    )
        .then(function (response) {
            console.log("put thanh cong");
            res.redirect('/admin/message_icon/');
        })
        .catch(function (error) {
            console.log(error);
        });
});


router.get('/delete/:employeeId', function (req, res, next) {
    var employeeId = req.params.employeeId;
    console.log("xoa", employeeId)
    res.redirect('/admin/message_icon/');
    var url = 'http://apihrm.dcv.vn/venus-service/employeeService/delete?id=' + employeeId;
    axios.delete(url,
        {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
    )
        .then(function (response) {
            console.log("Xoa nv thanh cong");
            res.redirect('/admin/message_icon/');
        })
        .catch(function (error) {
            console.log(error);
        });
})

module.exports = router;
