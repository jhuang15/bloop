import { Express } from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//  READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userID/posts", verifyToken, getUserPosts); //this will get the feed from a specific user

// UPDATE
router.patch("/:id/like", verifyToken, likePost);

export default router;
