const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', err => {
    if(err){
        return console.log('Err connnect mongodb', err);
    }
    console.log('Connect DB successfully')
})

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
})

app.use('*', (req, res) => {
    res.status(404).send({ message: '404 not found' })
  })

app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
        return console.log('Server Error', err);
    }
    console.log('Server started');
})