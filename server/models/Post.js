import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    // LIKES datatpye will be Map. 
    // If a picture is liked it will be added to Map same for removing a like. 
    // Could also use array but Map is more efficient when there are alot of likes
    likes: {
      type: Map, 
      of: Boolean
    },
    comments: {
      type: Array,
      default: []
    }
  },
  { timestamp: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;