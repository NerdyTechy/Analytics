let express = require('express');
let router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.identifier || req.body.identifier.length != 64){ return res.status(400).json({ success: false, message: "Invalid identifier" }); }
    let identifier = req.body.identifier;
    utils.updateMelodyClient(identifier);
    return res.status(200).json({ success: true, message: "Success" });
});

module.exports = router;