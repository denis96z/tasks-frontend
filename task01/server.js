'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

const FILES = [
    ['index.html'],
];

const STATIC_DIR = path.join(__dirname, 'static');
const STATIC_FILES = FILES.map((v) => path.join(STATIC_DIR, ...v));

const server = http.createServer((req, res) => {
    const name = (req.url === '/') ? 'index.html' : req.url.substring(1);

    const fp = path.join(STATIC_DIR, ...name.split('/'));
    if (!STATIC_FILES.includes(fp)) {
        res.writeHead(404);
        return res.end('NOT FOUND');
    }

    fs.readFile(fp, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('INTERNAL SERVER ERROR');
        }

        res.writeHead(200);
        res.end(data);
    });
});

const port = parseInt(process.env.PORT) || 3000;
server.listen(port);

console.log(`server started on ${port}`);
