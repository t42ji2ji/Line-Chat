const mongoose = require("mongoose");
const Story = require("../models/Story.js");


var storyController = {};

// Show list of Storys
storyController.list = function (req, res) {
  Story.find({}).exec(function (err, Storys) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log(res);
    }
  });
};

// Show Story by id
storyController.show = function (req, res) {
  Story.findOne({
    _id: req.params.id
  }).exec(function (err, Story) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log(res);
    }
  });
};


// // Save new Story
// storyController.save = async function (req, res) {
//     const Story = require("../models/Story.js")
//     var s = new Story(req)
//     return new Promise((resolve, reject) => {
//         s.save((err, col) =>{
//             if(err){

//             } else {

//             }
//         })        
//     })
// };
// storyController.save = function (req, res) {
//   var vm = this
//   const Story = require("../models/Story.js")
//   var s = new Story(req);
//   s.save(function (err, res) {
//     if (err) {
//       console.log("Error:" + err);
//       return "no"
//     } else {
//       console.log("Res:" + res);
//     }
//   })
// };

// Edit an Story
storyController.edit = function (req, res) {
  Story.findOne({
    _id: req.params.id
  }).exec(function (err, Story) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log(res);
    }
  });
};

// // Update an Story
// storyController.update = function(req, res) {
//   Story.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, Story) {
//     if (err) {
//       console.log(err);
//       res.render("../views/Storys/edit", {Story: req.body});
//     }
//     res.redirect("/Storys/show/"+Story._id);
//   });
// };

// // Delete an Story
// storyController.delete = function(req, res) {
//   Story.remove({_id: req.params.id}, function(err) {
//     if(err) {
//       console.log(err);
//     }
//     else {
//       console.log("Story deleted!");
//       res.redirect("/Storys");
//     }
//   });
// };

module.exports = storyController;
