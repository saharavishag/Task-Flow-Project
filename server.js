// set up a server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const tasks = require('./routes/tasks');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//set static folder
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/tasks', tasks);
app.use('/deletetask', tasks);
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist/index.html'));
})

// set up server to run on 4600
const port = process.env.port || 4600;
app.listen(port, (request, response) => {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    console.log(`LOG Server is running on PORT: ${port}, ${dateTime}`)
    
})