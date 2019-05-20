const { Router } = require('express')
const router = Router()
var story = require("../controllers/StoryController.js");

const st = {
  message: [
    [
      [true, "", true, 3],
      [true, "成功", false, ""],
      [false, "asdasd", false, ""],
      [false, "", true, 3],
      [false, "", true, 4],
      [false, "", true, 16],
      [true, "qweqwe", false, ""]
    ]
  ]
}

/* GET users listing. */
router.get('/storys', function (req, res, next) {
  res.json(st)
})

router.get('/storys/insert', function(req, res, next) {
  story.save(st, res)
});

router.get('/storys/insert2', story.save);


/* GET user by ID. */
router.get('/storys/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router