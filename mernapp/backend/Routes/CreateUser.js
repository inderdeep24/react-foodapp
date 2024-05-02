const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const jwtsecret = "mynameisthisheisagoodboyandalsoheisaintelligentboy"

const User = require('../models/User')


router.post("/createuser", [
    body('email').isEmail(),  
    // password must be at least 5 chars long
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log("error hai bhai", error)
            res.json({ success: false });
        }

    })
  
router.post("/loginuser", [  
    body('email').isEmail(),
    // password must be at least 5 chars long

    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        try {
            let userdata = await User.findOne({ email });  
            if (!userdata) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const passwordcompare = await bcrypt.compare(req.body.password,userdata.password)

            if (!passwordcompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const data = {
                user:{
                    id:userdata.id  
                }
            }
  
            const authtoken = jwt.sign(data,jwtsecret)  

            return res.json({ success: true,authtoken:authtoken });
        } catch (error) {
            console.log("error hai bhai", error)
            res.json({ success: false });
        }


    })
module.exports = router;