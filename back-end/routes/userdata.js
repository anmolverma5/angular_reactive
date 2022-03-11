const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/',

    async (req, res, next) => {
        console.log('userdata');
        res.status(200).send({ auth: true, message: 'userdata' });
    }

);


module.exports = router;