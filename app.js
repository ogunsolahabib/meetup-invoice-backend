
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());

app.use(authMiddleware);

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => { res.send('success') })

module.exports = app;