const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/',

    async (req, res, next) => {
        const user = window.localStorage.getItem("userToken");
        console.warn(user);
        knex("users").select("*").where("email", "like", "%" + email + "%").then((users) => {
            return res.json(users);
        })
    }

);


module.exports = router;