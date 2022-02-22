const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/',
    async (req, res, next) => {
        const row = await to(authentication.getPasswordByUser(req.body.userName));
        if (row.length === 0) {
            return res.sendStatus(401).send({message: 'Email is not exist in the database'});
        }

        const isCorrectPassword = authentication.comparePassword(
            req.body.password,
            row[0].password
        );
        if (!isCorrectPassword) {
            return res.sendStatus(401).send({message: 'Password is incorrect'});
        }

        const userId = row[0].userid;
        const token = jwt.sign({ userID: userId }, 'local-website', {
            expiresIn: '2h'
        });
        res.send({ token });

    }
);

module.exports = router;