import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
// below will make a call the mongoose thats why async used
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      firends,
      location,
      occupation
    } = req.body;

    const salt = await bcrypt.genSalt(); //Salt is used to encrpt passwords
    const passwordHash = await bcrypt.hash(password, salt); //hashing converts a password to ciphertext using hash algorithm

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      firends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); //201 means something has been created
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGGING IN
//Generally companies will use better and stronger auth but this is a very simple and basic understanding whats happening
// When u register and login it gives you some kind of token and user uses that to sign in for varification
export const login = async ( req, res ) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }) //use mongoose to try to find one with specified email
    if (!user) return res.status(400).json({ msg: "User does not exist"});

    const isMatch = await bcrypt.compare(password, user.password); //bcrpt will use the same salt to compare the hash
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials. "});

    const token = jwt.sign({ id: user._id }, process.envJWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user});
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
}
