var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

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
      password: await bcrypt.hash(req.body.password, 15),
      token: uid2(64)
    })
    const userSaved = await newUser.save();
    res.json({result: true, token : userSaved.token});
  }
})

router.post('/sign-in', async (req,res,next) => {
  const user = await UserModel.findOne({email: req.body.email});

  if (!user) {
    res.json({result: false})
  } else {
    await bcrypt.compare(req.body.password, user.password) ? res.json({result: true, token: user.token}) : res.json({result: false});
  }
})

router.post('/wish-list', async (req, res, next) => {
  console.log(req.body);
  const user = await UserModel.findOne({token: req.body.token});
  console.log(req.body.token);
  if(!user) throw new Error('User not found')

  user.wishlist.push({
    title : req.body.wishlist.title,
    content : req.body.wishlist.content,
    description : req.body.wishlist.description,
    url : req.body.wishlist.url
  })
  
  const updated = await user.save()
})


module.exports = router;
