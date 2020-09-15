const mongoose = require('mongoose');

// Attributes of the course object
var courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:'This field is required!'
    },
    courseId:{
        type:String
    },
    courseDuration: {
        type: String
        },
    courseFee: {
        type: String
    }
});

mongoose.model('Course',courseSchema);