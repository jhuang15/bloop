import Post from "../models/Post";

// CREATE
export const createPost = async (req, res ) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post ({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.userPicturePath,
      picturePath,
      likes: {},
      comments: []
    })

    await newPost.save(); //save into mongodb

    //Save the post then grab the post and return
    //Hard part of frontend is consider what has to be returned from backend api and how youre sending it/formatting it, etc.
    const post = await Post.find();
    res.status(201).json(post)
     
  } catch (err) {
    res.status(409).json( { message: err.message })
  }
}