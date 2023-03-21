import User from "../models/User";

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user) //send back to frontend of relevent id data
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all( //make multiple API calls to database
      user.friends.map((id) => User.findById(id))
    );
    // vv this is to slightly modify schema before sending it to frontend
    const formattedFriends = friends.map( 
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends); //send to frontend
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
export const addRemoveFriend = async ( req, res ) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if ( user.friends.includes(friendId)) { //if the friend id is already part of the main user friend list then  remove
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId); //if not included then add to friend list
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all( //make multiple API calls to database
      user.friends.map((id) => User.findById(id))
    );
    //this is to slightly modify schema before sending it to frontend
    const formattedFriends = friends.map( 
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends); //send to frontend 
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
