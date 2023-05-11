import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    console.log("antes de encrypt: " + user);

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    console.log("con el pass encrypted: " + user);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId: " + userId);
  const user = await User.findById(userId);
  console.log(`user found: ${userId}`);
  if (!user) return res.status(404).json({ message: "user not found" });
  res.status(200).json(user);
};

export const updateUserById = async (req, res) => {
  try {
    const userId = req.params.userId
    //const {username,email,password,roles} = req.body;
    // creating a new User
    const user = await User.findById(userId);

    if(!user) return res.status(404).json({message: "user not found"})

    if (req.body.username) user.username = req.body.username

    if(req.body.email) user.email = req.body.email

    if(req.body.password) user.password = await User.encryptPassword(user.password);

    if(req.body.roles) {
      const rolesFound = await Role.find({ name: { $in: req.body.roles } });
      user.roles = rolesFound
    }
    
    console.log("user "+user );
    console.log(" "+userId);

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  //const deletedProduct =
  await User.findByIdAndDelete(userId);
  res.status(204).json({ message: "user deleted" });
};
