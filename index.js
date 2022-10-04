const express = require('express');
const { subscribe } = require('./apiTest');
const app = express();

const port = process.env.PORT || 5555;

app.get('/',(req,res) => {
    res.send('Home');
    subscribe();
})

app.get('/ondc/onboarding',(req,res) => {
    console.log('ondc onboarding called');
    console.log('res: ',res);
})

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})