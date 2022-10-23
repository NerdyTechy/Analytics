const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.post('/melody', (req, res) => {
    // do database stuff
    return res.status(200).json({ success: true, message: "Success" });
});

app.all('/', (req, res) => { res.status(400).json({ success: false, message: "No endpoint" }); });
app.all('*', (req, res) => { res.status(404).json({ success: false, message: "Unknown endpoint" }); });

app.listen(2028, () => console.log(`Running on port 2028.`));