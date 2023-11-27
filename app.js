const path = require("path");
const express = require("express");
const db = require("./database/data");

//routes requiring
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//login page s.
app.use(loginRoutes);
//login page e.

//register page s
app.use(registerRoutes);
//register page e

app.listen(3000, () => {
   console.log("server initiated.");
});
