import express, { response } from 'express';

var app = express();
app.use(
    // parse all requests regardless of content-type
    express.json({ type: "*/*" })
);

app.use(express.static('public'));

// Import routes defined elsewhere
require('./src/controllers/root')(app);

const PORT = process.env.PORT || '3000';
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
});
