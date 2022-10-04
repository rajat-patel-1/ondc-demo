const express = require('express');
const { subscribe } = require('./apiTest');
const app = express();

const port = 5555;

app.get('/',(req,res) => {
    res.send('Home');
})

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
    subscribe();

})