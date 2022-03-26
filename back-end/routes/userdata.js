const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/',

    async (req, res, next) => {
        const email = 'anmol@gmail.com';
        console.warn(email);
        knex("users").select("*").where("email", "like", email).then((users) => {
            return res.json(users);
        })
        // const authHeader_old = req.headers['authorization']
        // const authHeader = req.headers['authorization']
        // const token = authHeader && authHeader.split(' ')[1]
    
        // if (token == null) return res.sendStatus(401)
        // jwt.verify(token, "" + process.env.JWT_KEY, (err, user) => {
        //     console.log(err)
    
        //     if (err) return res.sendStatus(403)
    
        //     req.user = user
        //     console.warn(user.email);
        //     const email = user.email;
        // console.warn(email);
        // knex("users").select("*").where("email", "like", email).then((users) => {
        //     return res.json(users);
        // })
        // })
    }

);


module.exports = router;