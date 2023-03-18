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