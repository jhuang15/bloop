import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser); //using query strings to grab specific id
router.get("/:id/friends", verifyToken, getUserFriends); //grab the user friends

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); 

export default router;