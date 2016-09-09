/**
 * Created by Geramy92 on 08.09.2016.
 */
"use strict";

let express = require('express');
let app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(23111, function () {
    console.info('Example app listening on port 23111!');
});