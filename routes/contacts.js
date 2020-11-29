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
            var departmentId = questionk[0].departmentId
            axios.post('http://apihrm.dcv.vn/venus-service/reportService/reportDepartment',
                {
                    month: 11,
                    year: 2020,
                    companyId: 1111,
                    departmentId: departmentId
                }, {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
            )
                .then(function (response) {
                    // console.log("1111",response.data)
                    var baocao = response.data;
                    var lstEmployee = response.data.entities;
                    // console.log("lstEmployee", lstEmployee)
                    // console.log("baocao", baocao);
                    res.render('admin/contacts/index', {
                        title: "",
                        questionk: questionk,
                        lstEmployee: lstEmployee,
                        baocao: baocao
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
            // res.render('admin/contacts/index', {title: "", questionk: questionk});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

});
router.post('/reportDepartment', function (req, res, next) {
    res.redirect('admin/contacts/index');
});
router.get('/edit/:employeeId', function (req, res, next) {
    var employeeId = req.params.employeeId;
    console.log("employeeId", employeeId);
    axios.post('http://apihrm.dcv.vn/venus-service/reportService/report',
        {
            year: 2020,
            employeeId: 2461
        }, {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
    )
        .then(function (response) {
            var entities = response.data.entities;
            console.log("3333",entities)
            res.render('admin/contacts/edit', {entities:entities} );
        })
        .catch(function (error) {
            console.log(error);
        });
});
module.exports = router;
