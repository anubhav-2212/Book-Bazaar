import express from "express"
import { addReview, deleteReview, getReview } from "../controllers/review.controller.js";
import { authMiddleware } from '../middlewares/auth.middlewares.js';

const reviewRoutes=express.Router();
 
reviewRoutes.post('/review/:bookId',authMiddleware,addReview)
reviewRoutes.get('/:bookId/review',authMiddleware,getReview)
reviewRoutes.delete('review/:id',authMiddleware,deleteReview)


export default reviewRoutes;