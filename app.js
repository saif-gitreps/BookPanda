const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const customerRoutes = require("./routes/customer");
const sellerRoutes = require("./routes/seller");
const bookCardRoutes = require("./routes/bookCard");

app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", loginRoutes);
app.use("/register", registerRoutes);
app.use("/customer", customerRoutes);
app.use("/seller", sellerRoutes);
app.use("/book", bookCardRoutes);

app.listen(3000, () => {
   console.log("server initiated.");
});
