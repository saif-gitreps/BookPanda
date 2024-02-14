const asyncHandler = require("../utils/asyncHandler.util");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const submitLogin = asyncHandler(async (request, response) => {
   const loginData = request.body;
   if (loginData.TYPE == "SELLER") {
      const seller = await prisma.seller.findFirst({
         where: {
            email: loginData.EMAIL,
         },
      });
      if (!seller) {
         response.render("login", {
            message: "No such email exists, Create an account to login.",
         });
      } else if (seller.password !== loginData.PASSWORD) {
         response.render("login", {
            message: "Incorrect password, please retry again.",
         });
      } else {
         response.redirect(`/seller/${seller.id}/profile`);
      }
   } else {
      const customer = await prisma.customer.findFirst({
         where: {
            email: loginData.EMAIL,
         },
      });
      if (!customer) {
         response.render("login", {
            message: "No such email exists, Create an account to login.",
         });
      } else if (customer.password !== loginData.PASSWORD) {
         response.render("login", {
            message: "Incorrect password, please retry again.",
         });
      } else {
         response.redirect(`/customer/${customer.id}`);
      }
   }
});

module.exports = {
   submitLogin,
};
