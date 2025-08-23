import express from "express"
import { addBooks, bookDetails, deleteBook, getAllBooks, updateBook } from "../controllers/books.controllers";
import { authMiddleware,checkAdmin} from "../middlewares/auth.middlewares";

const booksRoutes=express.Router();

booksRoutes.post("/add",authMiddleware,checkAdmin,addBooks)
booksRoutes.get("/booksList",getAllBooks)
booksRoutes.get("/bookDetails/:id",bookDetails)
booksRoutes.put("/update/:id",updateBook)
booksRoutes.delete("/delete/:id",deleteBook)

export default booksRoutes;