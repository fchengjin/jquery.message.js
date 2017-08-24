var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var resolve = file => path.resolve(__dirname, file);
app.use('/', express.static(resolve('./example')));
app.use('/dist', express.static(resolve('./dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.listen(process.env.PORT || 4567, function() {
    console.log("应用实例，访问地址为 localhost:4567")
});
