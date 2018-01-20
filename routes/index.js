var express = require('express');
var router = express.Router();
var http = require('http');
var https = require("https");
var request = require("request")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/app', function (req, res) {
    let id =req.query._id;
    http.get('http://clubfreetst.herokuapp.com/blogs/'+id, (resx) => {
        const {statusCode} = resx;
        const contentType = resx.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // consume response data to free up memory
            resx.resume();
            return;
        }
        resx.on('data', (chunk) => {
          console.log(JSON.parse(chunk));
           res.render("index",{data :JSON.parse(chunk)});
           //res.on('index', (chunk) => { console.log(JSON.parse(chunk)) });

        });

    });

});
router.get('/deletenote', function(req, res, next) {
   let id_n = req.query.id_note;
    request({uri :'http://clubfreetst.herokuapp.com/notes/'+id_n, method : "DELETE"}, function (err, resx, next) {
        res.redirect("/");
    });
    });



module.exports = router;
