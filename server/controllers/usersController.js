import Job from '../models/Job.js';
import User from '../models/User.js';
import Article from '../models/Article.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import { handleDeleteImage, handleUpload } from '../utils/cloudinary.js';
import attachCookie from '../utils/attachCookie.js';

export const updateUser = async (req, res) => {
  const { firstName, lastName, email, userPicture, companyLogo } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists && emailAlreadyExists.email !== email) {
    throw new BadRequestError('Email already in use');
  }

  const user = await User.findOne({ _id: req.user.userId });

  // Update basic user information
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  // Update user picture if provided
  if (userPicture) {
    // Check wether user.userPicture is an empty object
    if (Object.keys(user.userPicture).length !== 0) {
      // Delete previous user picture from Cloudinary if exists
      await handleDeleteImage(user.userPicture.public_id);
    }

    const { public_id, url } = await handleUpload(userPicture);
    console.log(public_id, url);
    user.userPicture = { public_id, url };
  }

  // Update company logo if provided
  if (companyLogo) {
    // Check wether user.companyLogo is an empty object
    if (Object.keys(user.companyLogo).length !== 0) {
      console.log(Object.keys(user.companyLogo).length);
      // Delete previous company logo from Cloudinary if exists
      await handleDeleteImage(user.companyLogo.public_id);
    }

    const { public_id, url } = await handleUpload(companyLogo);
    user.companyLogo = { public_id, url };
  }

  await user.save();

  const token = user.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
    message: 'Successfully updated your profile',
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  await user.deleteOne();

  res.status(StatusCodes.OK).json({ message: 'Account successfully deleted' });
};

export const getDashboardOverview = async (req, res) => {
  const { userId } = req.user;

  const totalPostedJobs = await Job.countDocuments({
    createdBy: userId,
    isArchived: false
  });
  const totalArchivedJobs = await Job.countDocuments({
    createdBy: userId,
    isArchived: true
  });
  const totalSavedJobs = await Job.countDocuments({
    [`savedBy.${userId}`]: true,
  });
  const totalAppliedJobs = await Job.countDocuments({
    [`appliedBy.${userId}`]: true,
  });
  const totalPostedArticles = await Article.countDocuments({
    createdBy: userId,
  });
  const totalSavedArticles = await Article.countDocuments({
    [`savedBy.${userId}`]: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      'posted-jobs': totalPostedJobs,
      'archived-jobs': totalArchivedJobs,
      'saved-jobs': totalSavedJobs,
      'applied-jobs': totalAppliedJobs,
      'posted-articles': totalPostedArticles,
      'saved-articles': totalSavedArticles,
    },
  });
};
