require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const utils = require("./utils.js");
utils.initDatabase();

const melody = require('./routes/melody.js');
app.use('/melody', melody);


app.all('/', (req, res) => { res.status(400).json({ success: false, message: "No endpoint" }); });
app.all('*', (req, res) => { res.status(404).json({ success: false, message: "Unknown endpoint" }); });

app.listen(2028, () => console.log(`Running on port 2028.`));