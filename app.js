require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const cors = require("cors")
const uri = process.env.MONGODBPASS
const mongoose = require("mongoose");
mongoose.connect(uri);

app.use('/static',express.static('uploads'))
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes)

app.listen(port, () => {
    console.log(`App running at http://127.0.0.1:${port}`);
})

module.exports = app