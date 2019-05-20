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

const app = require('express')();
const storys = require('./routes/storys');
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

var storyModel = mongoose.model('story',StorySchema);

//插入

//mongo

app.use(storys);
module.exports = { path: '/api', handler: app };

app.get('/say', (req, res, next) => {
  res.json({"name": "err"});
});

app.get('/insert', (req, res, next) => {
    
    var onestory = new storyModel({
        message: [[[true,"",true,3],[true,"成功",false,""],[false,"asdasd",false,""],[false,"",true,3],[false,"",true,4],[false,"",true,16],[true,"qweqwe",false,""]]]
    })
    onestory.save(function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
            vm.json({"n":"scuess"})
        }
    })
    next()
});
