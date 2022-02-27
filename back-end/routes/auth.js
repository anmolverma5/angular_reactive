require("dotenv").config({ path: "../.env" });
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/',
    async (req, res, next) => {
        const email = req.body.email ? req.body.email : '';
        const password = req.body.password ? req.body.password : '';
        // bcrypt.hash(req.body.password,10).then((hash)=>{
        //         password: hash
        //     })

        if (!email) {
            return res.json({ success: false, message: 'email is required' });
        } else if (!password) {
            return res.json({ success: false, message: 'password is required' });
        }
        var usernameReq = req.body.email;
        var passwordReq = req.body.password;
        knex('users')
            .where({ email: email })
            .select('password')
            .then(function (result) {
                if (!result || !result[0]) {  // not found!
                    console.log('invalid username');
                    return res.json({ success: false, message: 'invalid username' });
                    // report invalid username
                }
                var pass = result[0].password;
                if (password === pass) {
                    // const token = jwt.sign({ userID: userId }, 'local-website', {
                    //     expiresIn: '2h'
                    // });
                    var privateKey = ('../private.key');
                    var token = jwt.sign({ email: "email" }, "" + process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    // jwt.sign({ email: "email" }, "" + process.env.JWT_KEY, function (err, token) {
                    //     console.log(token);
                    //     res.send({ token });
                    //     return res.json({
                    //         success: 1,
                    //         message: 'login successfully',
                    //         token: token
                    //     });
                    // });
                    res.status(200).send({ auth: true, token: token });
                    // res.send({ token });
                    // return res.json({
                    //     success: 1,
                    //     message: 'login successfully',
                    //     token: token
                    // });
                    // console.log('login Successfully');
                } else {
                    // failed login
                    console.log('Password Incorrect');
                    return res.json({ success: false, message: 'Faild To Login' });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
);

module.exports = router;