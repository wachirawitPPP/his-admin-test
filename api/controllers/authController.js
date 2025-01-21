const  jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const config = require('../config');

const User = require("../models/userModel")

const register = async (req,res ) => {
    const {username, password } = req.body
    try {
        await User.createUser({username, password });
        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"User creation failed"})
    }
}


const login = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        // Ensure that username is passed as a string
        let user = await User.findUserByUsername(username);
        console.log(user);
        
        if (!user || user.isActive == false) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // let isActive = await User.findUserByUsername(username);

        // if (isAc) {
        //     return res.status(401).json({ message: "User is not active" });
        // }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // const isActive = await User.findUserByUsername(username);
        // console.log(isActive)


        const token = jwt.sign({ name:user.username, id: user.id }, process.env.JWT, { expiresIn: '1h' });
       console.log("token", token)
        res.status(200).json({ token, expiresIn: "3600"  });
        
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Error during login" });
    }
}


module.exports = {
    register,
    login
}