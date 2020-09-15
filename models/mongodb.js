const mongooose = require('mongoose');

mongooose.connect('mongodb://127.0.0.1:27017/MyCourses',
    {useNewUrlParser:true},
    (err)=>{
        if(!err){
            console.log("Successfully Established Connection with MongoDB");
        }
        else{
            console.log("Failed to Established Connection with MongoDB with Error:"+err);
        }
    }
);

// connecting node and MongoDB
require('./course.model');