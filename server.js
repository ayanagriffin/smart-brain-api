const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const user = require("./controllers/user");
const rank = require("./controllers/rank");
const image = require("./controllers/image");
const leaderboard = require("./controllers/leaderboard");
app.use(cors());



//MIDDLEWARE: used to parse JSON so express understands it
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  // db.select('*').from('users').then(users => {
  //   users.json()
  // }).then(users => {
  //   res.send("loaded", users);
  // })

  res.send('this is so sad :(')
  
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/user/:id", (req, res) => {
  user.handleGetUser(req, res, db);
});

app.get("/rank/:id", (req, res) => {
  rank.handleRank(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.get("/leaderboard", (req, res) => {
  leaderboard.handleLeaderboard(req, res, db);
});

app.delete("/user/:id", (req, res) => {
  user.handleDeleteUser(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
