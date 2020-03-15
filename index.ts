import bodyParser from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';

var app = express();

app.use(express.static('public'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

// Import routes defined elsewhere
require('./src/controllers/root')(app);
require('./src/controllers/upload')(app);

const PORT = process.env.PORT || '3000';
const server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
});

module.exports = server;