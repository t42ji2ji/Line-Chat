// const express = require('express')

// // Create express instnace
// const app = express()

// // Require API routes
// const users = require('./routes/users')


// // Import API Routes
// app.use(users)

// // Export the server middleware
// module.exports = {
//   path: '/api',
//   handler: app
// }
const express = require('express');
const cors = require('cors');

const app = express()

app.use(cors()); // For cors env
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// const app = require('express')();
// const storys = require('./routes/storys');
const mongoose = require('mongoose');

//mongo


var state = ""
var mongoDB = 'mongodb://d:joy60281@ds143326.mlab.com:43326/heroku_8b9vnpp1';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.info("Database Connected.");
});


var Schema = mongoose.Schema;
var StorySchema = new Schema({          
    message : { type: Array },
    time: { type: Date}                  
});

var loadStory = new Schema({ message : { type: Array },
    time: { type: Date}, ip : { type: String} }, 
    { collection : 'stories' }); 

var storyModel = mongoose.model('lottery' ,StorySchema);
var loadStoryModel = mongoose.model('stories', loadStory);
//插入

//mongo

// app.use(storys);
module.exports = { path: '/api', handler: app };

app.get('/say', (req, res, next) => {
    console.log("say");
  res.json({"name": "err"});
});

app.post('/insert_post', (req, res, next) => {
    console.log(req.body);
    var onestory = new storyModel(req.body)
    onestory.save(function(err, response){
        if (err) {
            res.json({"state": err});
        }
        else {
            res.json({"state": "isok"});
        }
    })
});

app.get('/get_stories', (req, res, next) => {
    let random = Math.floor(Math.random() * 12);
    promise = loadStoryModel.find().skip(random)
    .limit(1).exec() .then(function(docs) {
        console.log(docs);
        res.json(docs)
    }, function(err) {
        console.log(err);
    });
})

