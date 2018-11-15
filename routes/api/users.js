const express = require('express');
const router = express.Router();
//const gravatar = require('gravatar');

//const bcrypt = require("bcryptjs");

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
//router.get('/test', (req, res)  => res.json({msg: 'Users works'}));

// @route   GET api/users/register
// @desc    Register user
// @access  Public

// A promise can do .then and .catch
// Promise asynchronicity
router.get('/', (req, res) => {
  User.find()
  .then(users => {
    res.json(users); 
  })
  .catch(err => console.log(err));
});


router.get('/:name', (req, res) => {
  const {name, password, avatar} = req.params;
  User.findOne({ name : name })
    .then(user => {
      if(!user){
        return res.status(404).json({message: `User: ${name} not found`})
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({message: err}));
})

router.post('/', (req, res) => {
  const{ name, password, avatar } = req.body;

  const newUser = new User({
    name,
    password,
    avatar
  })
  
  newUser.save()
    .then(user => res.status(201).json(user))
    .catch(err => {
      res.status(500).json({message: err})
    });
})

router.delete('/:name', (req, res) => {
  // TODO: protected route ensure the user is the one deleting
  const {name, password, avatar} = req.params;
  User.findOne({ name : name })
    .then(user => {
      if(!user){
        return res.status(404).json({message: `User: ${name} not found`})
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({message: err}));
})

// router.post('/register', (req, res) => {
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if(user) {
//         return res.status(400).json({email: 'Email already exists'});
//       } else {
//         const avatar = gravatar.url(req.body.email,{
//           s: '200', // Size
//           r: 'pg',  // Rating
//           d: 'mm' // Default
//         });
//         const newUser = new User({
//           name: req.body.name,
//           email: req.body.email,
//           avatar,
//           password: req.body.password
//         });
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt,() => {
//               if(err) throw err;
//               newUser.password = hash;
//               newUser.save()
//                 .then(user => res.json(user))
//             })  .cathc(err => console.log(err));
//         })
//       }
//     })
// });

module.exports = router;