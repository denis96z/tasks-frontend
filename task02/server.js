'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'static')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on http://127.0.0.1:${port}`);
});
