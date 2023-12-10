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

//login page s.
app.use(loginRoutes);
//login page e.

//register page s
app.use(registerRoutes);
//register page e

//customer page s
app.use(customerRoutes);
//customer page e

//seller page s
app.use(sellerRoutes);

app.use(bookCardRoutes);

app.get("/search", async (request, response) => {
   const searchQuery = request.body.SEARCH;
   console.log(request.body);
   console.log(searchQuery);
   const bookMatch = await db.query(
      "select * from book_shelf where author like '%?' OR title like '%?' OR category like '%?'",
      [searchQuery, searchQuery, searchQuery]
   );
   console.log(bookMatch[0]);
   response.render("result", {
      result: bookMatch[0],
      customerId: request.query.customerId,
   });
});

app.listen(3000, () => {
   console.log("server initiated.");
});
