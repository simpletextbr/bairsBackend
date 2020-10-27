const express = require('express');
const cors = require('cors')
const path = require('path')


const routes = require('./routes')

const app = express();

app.use(cors());
app.use(express.json());

app.use("/files/profile/picture", express.static(path.resolve(__dirname, "..", "uploads", "profiles_pictures")));
app.use("/files/registration", express.static(path.resolve(__dirname, "..", "uploads", "registration_paths")));
app.use("/files/images", express.static(path.resolve(__dirname, "..", "uploads", "images")));

app.use(routes);

app.listen(3333);