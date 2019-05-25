var mongoose = require('mongoose');


var StorySchema = new mongoose.Schema({          
    message : { type: Array },
    time: { type: Date, default: Date.now}      ,
    ip: {type: String}            
});

module.exports = mongoose.model('Story', StorySchema);