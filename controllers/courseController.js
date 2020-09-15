// require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
// require('../node_modules/bootstrap/dist/js/bootstrap.js');
const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

// Link with database collection
const Course = mongoose.model('Course');

router.get('/',(req,res)=>{
    res.render("course/courseAddEdit",
    { viewTitle : "Insert New Course in MyCourses"}
    );
});

router.post('/',(req,res)=>{
    console.log(req.body);
    if(req.body._id==''){
        insertIntoMongoDB(req,res);
    }
    else{
        updateIntoMongoDB(req,res);
    }
});
// Insert into MondoDB
const insertIntoMongoDB=(req,res)=>{
    var course= new Course(); // Create object

    course.courseId=req.body.courseId;
    course.courseName=req.body.courseName;
    course.courseDuration=req.body.courseDuration;
    course.courseFee=req.body.courseFee;
    course.save(
        (err,doc)=>{
            if(!err){
                res.redirect('course/list');
            }
            else{
                console.log('Error during record insertion : ' + err)
            }
        }
    ); 
}
const updateIntoMongoDB=(req,res)=>{
    Course.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('course/list')
        }
        else{
            if(err.name='ValidationError'){
                // handleValidationError(err,req.body);
                // res.render("course/courseAddEdit", {
                //     //Retaining value to be displayed in the child view
                //     viewTitle: 'Update Course Details',
                //     employee: req.body
                //     });
            }
            else{
                console.log('Error during updating the record: ' + err);
            }
        }
    });
};

// const handleValidationError=(err,body){
//     for(field in err.errors){
//         switch(err.errors[field].path){
//             case 'courseName':
//                 body['courseNameError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

//Router to update a course using it's ID
router.get('/update/:id',(req,res)=>{
    Course.findById(req.params.id,(err,doc)=>{
        res.render('course/courseAddEdit',{viewTitle:"Update Course Details",course:doc})
    });
});

// Router to retrieve the complete list of available courses
router.get('/list',(req,res)=>{
    Course.find(
        (err,doc)=>{
            if(!err){
                res.render("course/list",{list:doc})
            }
            else{
                console.log('Failed to retrieve the Course List: '+ err);
            }
        }
    );
});

// Router Controller for DELETE request
router.get('/delete/:id',(req,res)=>{
    Course.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/course/list');
        }
        else{
            console.log('Failed to Delete Course Details: ' + err);
        }
    })
});
module.exports=router;