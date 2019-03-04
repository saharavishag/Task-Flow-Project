const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://avishag:admin123456@ds041494.mlab.com:41494/tasksdatabase_avishag',['tasks']);
// get tasks
router.get('/', (request, response) => {
    db.tasks.find(function(err, tasks){
        if(err){
            response.send(err);
        }
        response.json(tasks);
    });
});

// delete request
router.post('/deletetask', (request, response) => {
    var task = request.body;
    console.log('ROUTES: deleting...');
    console.log(task);
    db.tasks.remove(task, (err, tasks) => {
        if(err){
            response.send(err);
            console.log('error occured in deleting');
        }
        response.json(tasks);
    });
})

// save post
router.post('/task', (request, response) => {
    console.log('ROUTES TASKS: got inside and about to save');
    console.log(request.body);
    var task = request.body;
    if(!task.title){
        response.status(400);
        response.json({
            "error": "No title"
        });
    }
    else{
        db.tasks.save(task, (err, tasks) =>{
            if(err){
                response.send(err);
            }
            response.json(tasks);
        });
    }
})

module.exports = router;