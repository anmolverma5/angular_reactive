const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/',
    async (req, res, next) => {
        const row = await to(authentication.getPasswordByUser(req.body.userName));
        if (row.length === 0) {
            return res.sendStatus(401);
        }
        const isCorrectPassword = authentication.comparePassword(
            req.body.password,
            row[0].password
        );
        if (!isCorrectPassword) {
            return res.sendStatus(401);
        }

        const userId = row[0].userid;
        const token = jwt.sign({ userID: userId }, 'local-website', {
            expiresIn: '2h'
        });
        res.send({ token });
        return res.json({
            success: 1,
            message: 'login successfully',
            token: token
        });

    }
);

module.exports = router;