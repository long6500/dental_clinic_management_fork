const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
        return console.log('Server Error', err);
    }
    console.log('Server started');
})