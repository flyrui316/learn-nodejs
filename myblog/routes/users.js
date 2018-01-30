/**
 * Created by hl on 2018/1/30.
 */
const express = require('express');
const router = express.Router();

router.get('/:name', function (req, res) {
    res.render('users', {
        name: req.params.name
    });
});

module.exports = router;