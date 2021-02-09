var express = require('express');
var router = express.Router();

const UserModel = require('./db/user_model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-up', async (req,res,next) => {
  const check = await UserModel.findOne({email: req.body.email});
  if(check || !req.body.username || !req.body.password) {
    res.json({result: false});
  } else {
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    const userSaved = await newUser.save();
    res.json({result: true, userSaved});
  }
  
})

router.post('/sign-in', async (req,res,next) => {
  const user = await UserModel.findOne({email: req.body.email, password: req.body.password});
  if (!user) {
    res.json({result: false})
  } else {
    res.json({result: true, user})
  }
})

module.exports = router;
