const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

    // Register
    const registerUser= async (req, res) => {
        try {
          // hashing password
          const salt = bcrypt.genSaltSync(10);
          const hash = await bcrypt.hashSync(req.body.password, salt);
    
          const user = await new userModel({
            ...req.body,
            password: hash
          });
    
          await user.save()
          
          res.status(200).json({
            success: true,
            message: "Successfuly Created",
            data: user,})
    
        } catch (error) {
            console.error("Registration failed:", error); 
          res.status(500).json({message: "Failed, Try again"})
        }
      }
      
    // const registerUser = async (req, res) => {
    //     try {
    //         const salt = await bcrypt.genSalt(10);

    //         const hash = await bcrypt.hashSync(req.body.password, salt);

    //         const schema = Joi.object({
    //             username: Joi.string(),
    //             password: Joi.string().pattern(
    //                 new RegExp("^[a-zA-Z0-9]{8,1024}$")
    //             ),
    //             email: Joi.string().email({
    //                 minDomainSegments: 2,
    //                 tlds: { allow: ["com", "net"] },
    //             }),
    //         });

    //         const joiError = schema.validate(req.body);

    //         if (joiError.error) {
    //             const errorMessage = joiError.error.details
    //                 .map((detail) => detail.message)
    //                 .join(", ");

    //             return res.status(400).json({ error: errorMessage });
    //         }

    //         const newUser = await new userModel({
    //             ...req.body,
    //             password: hash,
    //         });

    //         await newUser.save();

    //         const token = jwt.sign(
    //             {
    //                 email: newUser.email,
    //                 password: newUser.password,
    //             },
    //             "priveteKey"
    //         );

    //         res.status(200).json({
    //             success: true,
    //             message: "successduly created",
    //             token,
    //             user: newUser,
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: "failed, Try again",
    //         });
    //     }
    // };

    // Login
    const loginUser = async (req, res) => {
        const { password, email } = req.body;

        try {
            const user = await userModel.findOne({
                email,
            });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: " email or password is not valid " });
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return res
                    .status(404)
                    .json({ message: " email or password is not valid " });
            }

            const token = jwt.sign(
                {
                    email: user.email,
                    password: user.password,
                },
                "priveteKey"
            );

            res.status(200).json({
                success: true,
                message: "successduly created",
                token,
                user,
            });
        } catch (error) {
            res.status(500).json({
                message: "failed, Try again",
            });
        }
    };

    // Get All
    const getAllUsers = async (req, res) => {
        try {
            const users = await userModel.find()
            res.status(200).json({
                message: "All Users",
                data: users,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };

    module.exports = {
        registerUser,
        loginUser,
        getAllUsers
    }