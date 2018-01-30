/**
 * Created by hl on 2018/1/30.
 */
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('hello, express');
});

module.exports = router;
