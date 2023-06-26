require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const express = require('express')
const router = express.Router();
const Login = require('../models/Login');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');



//sign up
router.post('/createAccount', [
    body('pass', 'Password must be atleast 5 characters long').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return (res.status(400).json({ errors: "Password must be atleast 5 characters long" }));
    }
    try {
        let user = await Login.findOne({ user: req.body.user });
        if (user) {
            return res.status(400).json({ errors: "Username already taken" })
        }

        const salt = await bcrypt.genSalt(10);
        securePass = await bcrypt.hash(req.body.pass, salt);
       //create dsr
            useraccount = await Login.create({
                user: req.body.user,
                dist: req.body.dist,
                pass: securePass
            })
            const data = {
                user: useraccount.user
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ errors: false, 'token': authToken })

    } catch (error) {
        console.log(error.message);
    }
}
);

//Login route
router.post("/loginAccount", [
    body('pass', 'Password must be atleast 5 characters long').isLength({ min: 5 }).withMessage("Atleast 5 characters in password"),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return (res.status(400).json({ errors: "Password must be atleast 5 characters long" }));
    }
    const user = req.body.user
    const pass = req.body.pass;
    try {
        let userAccount = await Login.findOne({ user });
        if (!userAccount) {
            return res.status(400).json({ errors: "Incorrect username or password" });
        }
        const passCompare = await bcrypt.compare(pass, userAccount.pass);
        if (!passCompare) {
            return (res.status(400).json({ errors: "Incorrect username or password" }))
        }

        const data = {
            user: userAccount.user
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ errors: false, 'token': authToken, 'user': data.user });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ errors: "Internal server error" });
    }
})

module.exports = router;