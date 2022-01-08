'use strict';

const path = require('path');
const crypto = require('crypto');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'static')));

app.post('/api/token', async (req, res) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(2000);

    crypto.randomBytes(16, (err, buff) => {
        if (err) {
            const b = 'INTERNAL SERVER ERROR';
            res.status(500)
                .set({
                    'Content-Type': 'application/json',
                    'Content-Length': b.length,
                })
                .send(b);
        } else {
            const b = JSON.stringify({
                'token': buff.toString('hex'),
            });
            res.status(200)
                .set({
                    'Content-Type': 'application/json',
                    'Content-Length': b.length,
                })
                .send(b)
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on http://127.0.0.1:${port}`);
});
