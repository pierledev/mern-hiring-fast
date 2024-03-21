import slugify from 'slugify';
import Article from '../models/Article.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import checkPermissions from '../utils/checkPermissions.js';

// All users
export const getAllArticles = async (req, res) => {
  const articles = await Article.find().populate('createdBy', [
    'firstName',
    'lastName',
    'company',
  ]);

  res.status(StatusCodes.OK).json({ success: true, data: articles });
};

export const getSingleArticle = async (req, res) => {
  const { id } = req.params;

  const article = await Article.findOne({ _id: id }).populate('createdBy', [
    'firstName',
    'lastName',
    'company',
    'companyLogo',
  ]);

  if (!article) {
    throw new NotFoundError('Article not found');
  }

  res.status(StatusCodes.OK).json({ success: true, data: article });
};

export const likeArticle = async (req, res) => {
  const { id: articleId } = req.params;
  const { userId } = req.user;

  const articleExists = await Article.findOne({ _id: articleId });
  if (!articleExists) {
    throw new NotFoundError('Article not found');
  }

  articleExists.likedBy.set(userId, true);

  const updatedArticle = await Article.findByIdAndUpdate(
    articleId,
    { likedBy: articleExists.likedBy },
    { new: true, runValidators: true }
  ).populate('createdBy', ['firstName', 'lastName', 'company', 'companyLogo']);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: updatedArticle, message: 'Article liked!' });
};

export const unlikeArticle = async (req, res) => {
  const { id: articleId } = req.params;
  const { userId } = req.user;

  const articleExists = await Article.findOne({ _id: articleId });
  if (!articleExists) {
    throw new NotFoundError('Article not found');
  }

  articleExists.likedBy.delete(userId);

  const updatedArticle = await Article.findByIdAndUpdate(
    articleId,
    { likedBy: articleExists.likedBy },
    { new: true, runValidators: true }
  ).populate('createdBy', ['firstName', 'lastName', 'company', 'companyLogo']);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: updatedArticle, message: 'Article unliked!' });
};

export const saveArticle = async (req, res) => {
  const { id: articleId } = req.params;
  const { userId } = req.user;

  const articleExists = await Article.findOne({ _id: articleId });
  if (!articleExists) {
    throw new NotFoundError('Article not found');
  }

  articleExists.savedBy.set(userId, true);

  const updatedArticle = await Article.findByIdAndUpdate(
    articleId,
    { savedBy: articleExists.savedBy },
    { new: true, runValidators: true }
  ).populate('createdBy', ['firstName', 'lastName', 'company', 'companyLogo']);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: updatedArticle, message: 'Article saved!' });
};

export const unsaveArticle = async (req, res) => {
  const { id: articleId } = req.params;
  const { userId } = req.user;

  const articleExists = await Article.findOne({ _id: articleId });
  if (!articleExists) {
    throw new NotFoundError('Article not found');
  }

  articleExists.savedBy.delete(userId);

  const updatedArticle = await Article.findByIdAndUpdate(
    articleId,
    { savedBy: articleExists.savedBy },
    { new: true, runValidators: true }
  ).populate('createdBy', ['firstName', 'lastName', 'company', 'companyLogo']);

  res.status(StatusCodes.OK).json({
    success: true,
    data: updatedArticle,
    message: 'Article unsaved!',
  });
};

export const getAllSavedArticles = async (req, res) => {
  const { userId } = req.user;

  // Find articles with savedBy Map containing the userId
  const savedArticles = await Article.find({ [`savedBy.${userId}`]: true });

  res.status(StatusCodes.OK).json({ success: true, data: savedArticles });
};

// Only employers
export const createArticle = async (req, res) => {
  const { userId } = req.user;
  const { title, selectedBanner, content } = req.body;

  const slug = slugify(title, { lower: true });

  const articleAlreadyExists = await Article.findOne({
    slug,
  });
  if (articleAlreadyExists) {
    throw new BadRequestError('Article with the same title already exists');
  }

  const newArticle = await Article.create({
    title,
    slug,
    selectedBanner,
    content,
    createdBy: userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: newArticle, message: 'Article created' });
};

export const getAllEmployersPostedArticles = async (req, res) => {
  const { userId } = req.user;
  const articles = await Article.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({ success: true, data: articles });
};

export const deleteArticle = async (req, res) => {
  const { id: articleId } = req.params;

  const articleExists = await Article.findOne({
    _id: articleId,
    createdBy: req.user.userId,
  });
  if (!articleExists) {
    throw new NotFoundError('Article not found');
  }

  checkPermissions(req.user, articleExists.createdBy);

  await articleExists.deleteOne();

  const updatedArticles = await Article.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({
    success: true,
    data: updatedArticles,
    message: 'Article deleted!',
  });
};

export const editArticle = async (req, res) => {
  const { id: articleId } = req.params;

  const articleExists = await Article.findOne({ _id: articleId });
  if (!articleExists) {
    throw new NotFoundError('Article not found');
  }

  await Article.findByIdAndUpdate(articleId, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: 'Article edited!' });
};
