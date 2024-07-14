const userModel = require('../../models/userModel');
const User = require('../../models/userModel');

const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
       
    const allUsers = await userModel.find()

    res.json({
          message: "All User ",
          data: allUsers,
          success:true,
          error:false

    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = allUsers;
