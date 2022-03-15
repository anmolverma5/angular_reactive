const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/',

    async (req, res, next) => {
        const email = req.body.email ? req.body.email : '';
        user = JSON.parse(window.localStorage.getItem('user'))
        console.warn(user);
        return knex("users").select("*").where("email", "like", "%" + email + "%").then();
    }

);


module.exports = router;