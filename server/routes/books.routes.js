import express from "express"
import { addBooks, bookDetails, deleteBook, getAllBooks, updateBook } from "../controllers/books.controllers.js";
import { authMiddleware,checkAdmin} from "../middlewares/auth.middlewares.js";

const booksRoutes=express.Router();

booksRoutes.post("/add",authMiddleware,checkAdmin,addBooks)
booksRoutes.get("/booksList",authMiddleware,getAllBooks)
booksRoutes.get("/bookDetails/:id",authMiddleware,bookDetails)
booksRoutes.put("/update/:id",authMiddleware,checkAdmin,updateBook)
booksRoutes.delete("/delete/:id",authMiddleware,checkAdmin,deleteBook)

export default booksRoutes;