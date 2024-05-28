const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Claim = require("../models/Claim");
const { v4: uuidv4 } = require("uuid");
const {setUser}=require("../services/auth");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);
var jwt = require("jsonwebtoken");

// Example function to create a new user
const controllers = {};


controllers.signup = async (req, res) => {
  
  try {
    const { name, email, password,walletAddress } = req.body;
    console.log("req body is----->", req.body);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email and password are required." });
    }
    const existingUser = await User.find({ email: email });
    console.log("existing user is---->", existingUser);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already Exist" });
    }
    let myPass=await bcrypt.hash(password,10)

    await User.create({
      name,
      email,
      password:myPass,
      walletAddress
    });
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (e) {
    console.log("error is---->", e);
    return res.status(500).json({ error: "Bad Request" });
  }
};


controllers.getUser = async (req, res) => {
  try {
    const { name, email, walletAddress } = req.body;
    console.log("req body is----->", req.body);
    if (!email) {
      return res
        .status(400)
        .json({ error: "Email is required." });
    }
    const existingUser = await User.find({ email: email });
    console.log("existing user is---->", existingUser);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already Exist" });
    }
    // let myPass = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      walletAddress
      // password: myPass,
    });
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (e) {
    console.log("error is---->", e);
    return res.status(500).json({ error: "Bad Request" });
  }
};




// const jwt = require("jsonwebtoken");

controllers.login = async (req, res) => {
  try {
    const { email, password, walletAddress  } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Only find user by email
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the stored hash
    if (await bcrypt.compare(password, user.password)) {
      // Ensure sensitive information like passwords are not included in the token
      // const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send the token in a cookie
      // res.cookie("token", token, { httpOnly: true, sameSite: 'strict' });

      return res.status(200).json({
        message: "User logged in successfully",
        // Send only the necessary user information
        user: {
          id: user._id,
          name: user.name,
          email: user.email,}
        // token,
      });
    } else {
      return res.status(401).json({ message: "Invalid password." });
    }

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login." });
  }
};




controllers.getAllUsersWithDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = await User.find({}); // Get all users
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        // Add deposit history
        const depositHistory = await Deposit.find({
          walletAddress: user.walletAddress,
        });


        // Add claim history
        const claimHistory = await Claim.find({
          walletAddress: user.walletAddress,
        });

        
        // Extract referrers from deposit and claim history
        const referrers = [
          ...new Set(
            [
              ...depositHistory.map((deposit) => deposit.referrer),
              ...claimHistory.map((claim) => claim.referrer),
            ].filter((referrer) => referrer)
          ), // Filter out undefined or null referrers
        ];

        return {
          ...user.toObject(),
          depositHistory,
          claimHistory,
          referrers,
        };
      })
    );

    res.status(200).json(usersWithDetails);
  } catch (error) {
    console.error("Error in getAllUsersWithDetails:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = controllers;
