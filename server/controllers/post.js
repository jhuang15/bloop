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
    res.status(201).json(post) //201: successful create
     
  } catch (err) {
    res.status(409).json( { message: err.message })
  }
}

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post) // 200: successful request

  } catch (err) {
    res.status(404).json( { message: err.message })
  }
}

//This function will only send the post that match the userId
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find( { userId });
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json( { message: err.message })
  }
}

// UPDATE
export const likePost = async (req, res) => {
  try{
    const { id } = req.params; // Grab relevent post, id comes from query sting 
    const { userId } = req.body; // userId comes from the body of request bc how it will be sent from frontend
    const post = await Post.findById(id); // Grabing the post information
    const isLiked = post.likes.get(userId);  // Grabbing whether the user has liked it or not

    // Chcek if userId exist, if yes then that post has been liked by that person
    if (isLiked) {
      post.likes.delete(userId) // Delete if already exist
    } else {
      post.likes.set(userId, true) // Set if it doesn't exist
    }

    // Finally, depending on isLiked is we're going to update post and passing on the new likes. 
    // This will update the frontend when like button hit
    const updatedPost = await Post.findByIdAndUpdate(
      id, 
      { likes: post.likes }, // The list of likes we modified
      { new: true}
    )

    res.status(200),json()

  } catch (err) {
    res.status(404).json( { message: err.message })
  }
}