// userController.js

const User = require("../models/userModel");
// exports.creatUser = async (req, res) => {

//     try {
//         const newUser = await User.create({

//             name: req.body.name,
//             email: req.body.email,
//             address: req.body.address,

//         });

//         res.status(201).json({ message: "Created", data: newUser })

//     } catch (error) {

//         res.status(500).json({ message: "fail" })
//     }

// }

exports.CreateUser = async (req, res) => {
    try {

        const NewUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
        });
        res.status(201).json({ message: "Created", data: NewUser })
    } catch (error) {
        res.status(500).json({ message: "fail" })
    }

}
exports.getUserById = async (req, res) => {
    try {

        const user =  await User.findById(req.params.id);

        if (!user) {


            res.status(404).json({ message: "not found" })

        }
        res.status(201).json({ message: "user is ", data: user })


    } catch (error) {

        res.status(500).json({ message: "fail" })
    }

}