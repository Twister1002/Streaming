const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./bin")))
// app.post("/api/login", (req, res) => {
//     const patients = require("./data/patients.json");
//     const data = req.body;
//     const user = patients[data.type].find(user => user.username === data.username && user.password === data.password);

//     res.send(JSON.stringify(
//         user
//     ))
// });
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './bin', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
