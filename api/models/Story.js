var mongoose = require('mongoose');


var StorySchema = new mongoose.Schema({          
    message : { type: Array },
    time: { type: Date, default: Date.now}                  
});

module.exports = mongoose.model('Story', StorySchema);