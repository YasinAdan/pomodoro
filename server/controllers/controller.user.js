// controller files are used to divide code up, this file divides the code for user.route.js

import bcrypt, { hashSync, compareSync } from "bcrypt";
import { User } from "../models/model.user.js";

import { signupUserVal, loginUserVal } from "../validation/validation.user.js";

export const userSignup = async (req,res) => {

  try {
    const { error } = signupUserVal(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });


    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(409).send({ message: "User's already registered. Use a different E-mail." });

    const hashedPass = bcrypt.hashSync(password, 10);
    
    const newUser = new User({email,  password: hashedPass});
    await newUser.save();

    res.status(201).send({ message: "User's registered successfully." });

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};

// login
export const userAuth = async (req, res) => {
    try {
      const { error } = loginUserVal(req.body);
      if (error) return res.status(401).send({message: error.details[0].message});
  
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if(!user) return res.status(401).send({message: "Invalid email or password."});
  
      const validPass = await compareSync(password, user.password);
  
      if(!validPass) return res.status(401).send({message: "Invalid email or password."});
  
      const id = user._id;
  
      const token = user.generateAuthToken();
      res.status(200).send({user: {id, email}, data: token, message: "Logged in sucessfully."})
    }
    catch (error) {
      res.status(500).send({ message: error.message });
    }
};

// save user session to database

export const saveUserSession = async (req, res) => {
  try {

   // handle saving user session to database here

   const user = await User.findOne({ _id: req.body.id });

    if(!user) return res.status(404).send({message: "Something's wrong with user validation."});

    // save session to database

    user.pmSessions.push(req.body);

    await user.save();


    res.status(200).send({resd: user.pmSessions,message: "Session saved successfully."});

  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

// get user sessions from database

export const getUserSessions = async (req, res) => {
  try {
    // handle getting user sessions from the database here, searching by the ID provided in the headers
    const user = await User.findOne({ _id: req.headers.id });

    if (!user) {
      return res.status(404).send({ message: "Something's wrong with user validation." });
    }

    // get sessions from the database
    const sessions = user.pmSessions;

    res.status(200).send({ sessions: sessions, message: "Sessions retrieved successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};