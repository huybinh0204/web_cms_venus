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
            var departmentId = questionk[0].departmentId;
            var toy = new Date();
            var month = toy.getMonth()+1;
            var year = toy.getFullYear();

            axios.post('http://apihrm.dcv.vn/venus-service/reportService/reportDepartment',
                {
                    month: month,
                    year: year,
                    companyId: 1111,
                    departmentId: departmentId
                }, {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
            )
                .then(function (response) {
                    // console.log("1111",response.data)
                    var baocao = response.data;
                    var lstEmployee = response.data.entities;
                    console.log("111",month)
                    console.log("year",year)
                    if (lstEmployee != undefined)
                        res.render('admin/contacts/index', {
                            title: "",
                            questionk: questionk,
                            lstEmployee: lstEmployee,
                            baocao: baocao,
                            month:month,
                            year:year
                        });
                    else {
                        res.render('admin/contacts/index', {
                            title: "",
                            questionk: questionk,
                            lstEmployee: [],
                            baocao: baocao,
                            month:month,
                            year:year
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
});
router.get('/:departmentId', function (req, res, next) {
    var departmentId = req.params.departmentId;
    axios.get('http://apihrm.dcv.vn/venus-service/departmentService/findAll', {
        headers: {
            'Cookie': JSESSIONID.checkJSESSIONID
        }
    })
        .then(function (response) {
            var questionk = response.data.lstDepartment;
            var toy = new Date();
            var month = toy.getMonth()+1;
            var year = toy.getFullYear();
            axios.post('http://apihrm.dcv.vn/venus-service/reportService/reportDepartment',
                {
                    month: month,
                    year: year,
                    companyId: 1111,
                    departmentId: departmentId
                }, {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
            )
                .then(function (response) {
                    // console.log("1111",response.data)
                    var baocao = response.data;
                    var lstEmployee = response.data.entities;
                    if (lstEmployee != undefined)
                        res.render('admin/contacts/index', {
                            title: "",
                            questionk: questionk,
                            lstEmployee: lstEmployee,
                            baocao: baocao,
                            month:month,
                            year:year
                        });
                    else {
                        res.render('admin/contacts/index', {
                            title: "",
                            questionk: questionk,
                            lstEmployee: [],
                            baocao: baocao,
                            month:month,
                            year:year
                        });
                    }
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
router.get('/edit/:employeeId', function (req, res, next) {
    var employeeId = req.params.employeeId;
    console.log("employeeId", employeeId);
    axios.post('http://apihrm.dcv.vn/venus-service/reportService/report',
        {
            year: 2020,
            employeeId: employeeId
        }, {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
    )
        .then(function (response) {
            var entities = response.data.entities;
            res.render('admin/contacts/edit', {entities:entities} );
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.get('/:departmentId/:year', function (req, res, next) {
    var departmentId = req.params.departmentId;
    var is_year = req.params.year;
    var month = is_year.slice(0,2);
    var year = is_year.slice(3,7);
    axios.get('http://apihrm.dcv.vn/venus-service/departmentService/findAll', {
        headers: {
            'Cookie': JSESSIONID.checkJSESSIONID
        }
    })
        .then(function (response) {
            var questionk = response.data.lstDepartment;
            axios.post('http://apihrm.dcv.vn/venus-service/reportService/reportDepartment',
                {
                    month: month,
                    year: year,
                    companyId: 1111,
                    departmentId: departmentId
                }, {headers: {'Cookie': JSESSIONID.checkJSESSIONID}}
            )
                .then(function (response) {
                    // console.log("1111",response.data)
                    var baocao = response.data;
                    var lstEmployee = response.data.entities;
                    console.log("2222",baocao)
                    console.log("lstEmployee",lstEmployee)
                    if (lstEmployee != undefined)
                        res.render('admin/contacts/index', {
                            title: "",
                            questionk: questionk,
                            lstEmployee: lstEmployee,
                            baocao: baocao,
                            month:month,
                            year:year
                        });
                    else {
                        res.render('admin/contacts/index', {
                            title: "",
                            questionk: questionk,
                            lstEmployee: [],
                            baocao: baocao,
                            month:month,
                            year:year
                        });
                    }
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

module.exports = router;
