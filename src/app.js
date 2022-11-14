require("dotenv").config();
require("./utils").initDatabase();
var express = require("express");
var app = express();

app.use(express.json());

app.use('/melody', require('./routes/melody.js'));

app.all('/', (req, res) => { res.status(400).json({ success: false, message: "No endpoint" }); });
app.all('*', (req, res) => { res.status(404).json({ success: false, message: "Unknown endpoint" }); });

app.listen(2028, () => console.log(`Running on port 2028.`));