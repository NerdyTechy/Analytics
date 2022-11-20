var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

router.post('/', (req, res) => {
    if (!req.body.identifier || req.body.identifier.length != 64){ return res.status(400).json({ success: false, message: "Invalid identifier" }); }
    utils.updateMelodyClient(req.body.identifier);
    return res.status(200).json({ success: true, message: "Success" });
});

module.exports = router;