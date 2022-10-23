const express = require("express");
const app = express();
require("dotenv").config();

const utils = require("./utils.js");

app.use(express.json());

utils.initDatabase();

app.post('/melody', (req, res) => {
    if (!req.body.identifier || req.body.identifier.length != 64){ return res.status(400).json({ success: false, message: "Invalid identifier" }); }
    const identifier = req.body.identifier;
    utils.updateMelodyClient(identifier);
    return res.status(200).json({ success: true, message: "Success" });
});

app.all('/', (req, res) => { res.status(400).json({ success: false, message: "No endpoint" }); });
app.all('*', (req, res) => { res.status(404).json({ success: false, message: "Unknown endpoint" }); });

app.listen(2028, () => console.log(`Running on port 2028.`));