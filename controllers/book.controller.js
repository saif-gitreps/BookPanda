const asyncHandler = require("../utils/asyncHandler.util");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBookById = asyncHandler(async (request, response) => {
   try {
      const bookId = parseInt(request.params.id);
      const book = await prisma.book_shelf.findUnique({
         where: {
            id: bookId,
         },
      });
      if (!book) {
         return response.status(404).json({ error: "Book not found" });
      }
      response.render("book", {
         book: book,
         customerId: request.query.customerId,
      });
   } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal server error" });
   }
});

const getBook = asyncHandler(async (request, response) => {
   try {
      const searchQuery = request.query.SEARCH;
      const bookMatch = await prisma.book_shelf.findMany({
         where: {
            OR: [
               {
                  author: {
                     contains: searchQuery,
                  },
               },
               {
                  title: {
                     contains: searchQuery,
                  },
               },
               {
                  category: {
                     contains: searchQuery,
                  },
               },
            ],
         },
      });
      response.render("result", {
         result: bookMatch,
         customerId: request.query.customerId,
      });
   } catch (error) {
      response.status(404).render("result", {
         result: bookMatch,
         customerId: request.query.customerId,
      });
   }
});

module.exports = {
   getBookById,
   getBook,
};
