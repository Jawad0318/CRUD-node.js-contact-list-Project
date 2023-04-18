const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// @desc register user
//@route Get /api/users/registers
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    res.status(400);
    throw new Error(' All fields are mandotory ');
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('user already exist ');
  }
  //Hash Password
  const HashPassword = await bcrypt.hash(password, 10);
  let user = await User.create({
    username,
    email,
    password: HashPassword,
  });
  user = user.toObject();
  delete user.password;

  res.json({ message: 'Register the user', user });
});

// @desc login user
//@route Get /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('all fields are mandotary ');
  }

  const user = await User.findOne({ email });

  // comparing password with hashedpassword

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('email or password is not valid');
  }
});

// @desc current  user
//@route Get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };
