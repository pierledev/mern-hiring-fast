import express from 'express';
import {
  createArticle,
  deleteArticle,
  editArticle,
  getAllArticles,
  getAllEmployersPostedArticles,
  getAllSavedArticles,
  getSingleArticle,
  likeArticle,
  saveArticle,
  unlikeArticle,
  unsaveArticle,
} from '../controllers/articlesController.js';
import {
  authHandlerMiddleware,
  employerHandlerMiddleware,
} from '../middlewares/index.js';

const router = express.Router();

router
  .route('/')
  .post(authHandlerMiddleware, employerHandlerMiddleware, createArticle)
  .get(getAllArticles);

router
  .route('/posted')
  .get(
    authHandlerMiddleware,
    employerHandlerMiddleware,
    getAllEmployersPostedArticles
  );

router.route('/saved').get(authHandlerMiddleware, getAllSavedArticles);

router
  .route('/:id')
  .get(getSingleArticle)
  .patch(authHandlerMiddleware, employerHandlerMiddleware, editArticle)
  .delete(authHandlerMiddleware, employerHandlerMiddleware, deleteArticle);

router.route('/:id/like').patch(authHandlerMiddleware, likeArticle);

router.route('/:id/unlike').patch(authHandlerMiddleware, unlikeArticle);

router.route('/:id/save').patch(authHandlerMiddleware, saveArticle);

router.route('/:id/unsave').patch(authHandlerMiddleware, unsaveArticle);

export default router;
