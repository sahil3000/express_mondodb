require('./models/mongodb');

//Import the necessary packages
const express = require('express');
var app = express();
const path = require('path');
const bodyparser = require('body-parser');

const courseController = require('./controllers/courseController');

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());


// app.engine('twig', exphb({ extname: 'twig', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' }));
app.set('view engine','twig');
app.set('views','views');

//Create a welcome message and direct them to the main page
app.get('/',(req,res)=>{
  res.send("<h2>Welcome to MyCourses Node.js MongoDBTutorails</h2>Click Here to go to <b> <a href='course'>Course Page</a></b> ");
});

// Set the Controller path which will be responding the user actions
app.use('/course', courseController);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
 


