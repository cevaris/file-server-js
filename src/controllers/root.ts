import express from 'express';

module.exports = (app: express.Express) => {
    app.get('/', function (req, res) {
        res.send('File Server\n');
    });
}