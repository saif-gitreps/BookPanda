const path = require("path");
const express = require("express");
const db = require("./database/data");

//routes requiring
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const customerRoutes = require("./routes/customer");
const sellerRoutes = require("./routes/seller");
const bookCardRoutes = require("./routes/bookCard");

app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("cookie-parser")();

app.use(loginRoutes);
app.use(registerRoutes);
app.use(customerRoutes);
app.use(sellerRoutes);
app.use(bookCardRoutes);

app.listen(3000, () => {
   console.log("server initiated.");
});
