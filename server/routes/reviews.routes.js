import express from "express"
import { addReview, deleteReview, getReview } from "../controllers/review.controller.js";
import { authMiddleware } from '../middlewares/auth.middlewares.js';

const reviewRoutes=express.Router();
 
reviewRoutes.post('/:bookId/review',authMiddleware,addReview)
reviewRoutes.get('/:bookId/review',authMiddleware,getReview)
reviewRoutes.delete('/review/:reviewId',authMiddleware,deleteReview)


export default reviewRoutes;