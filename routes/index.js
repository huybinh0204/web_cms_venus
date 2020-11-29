var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const axios = require('axios');
var s =require('./link/file')
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {status: ''});
});

router.post('/', function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;
    var data = { email:email,password:password}
    axios.post('http://apihrm.dcv.vn/venus-service/employeeService/login', {
        email: email,
        password: password
    })
        .then(function (response) {
            // console.log("22",response)
            var is_cookie = response.headers['set-cookie'].toString();
            var a = is_cookie.slice(11,43);
            s.checkJSESSIONID = 'JSESSIONID='+a;
            // console.log("is_cookie",response)
            console.log("is_cookie",s.checkJSESSIONID )
            // res.cookie('JSESSIONID',s.checkJSESSIONID );
            // console.log("1112123",req.cookies.JSESSIONID);
            res.render('admin/index', {status: '200'});
        })
        .catch(function (error) {
            res.render('index', {status: "403"});
        });
});


module.exports = router;
