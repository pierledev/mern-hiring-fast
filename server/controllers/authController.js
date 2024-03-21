import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import attachCookie from '../utils/attachCookie.js';
import { handleUpload } from '../utils/cloudinary.js';

export const register = async (req, res) => {
  // Handle form data and Cloudinary URL
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    company,
    companyLogo,
    userPicture,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new BadRequestError(
      'First name, last name, email, password, and confirm password are required'
    );
  }

  if (firstName.trim().length < 2 || lastName.trim().lenghth < 2) {
    throw new BadRequestError('First name and last name min 2 characters');
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords do not match');
  }

  let newUser;

  if (company && !companyLogo) {
    newUser = await User.create({ ...req.body, userType: 'employer' });
  }

  if (!company && !userPicture) {
    newUser = await User.create(req.body);
  }

  if (companyLogo) {
    // Upload image to cloudinary and get the uploaded image's public_id and url
    const { public_id, url } = await handleUpload(companyLogo);

    newUser = await User.create({
      ...req.body,
      companyLogo: { public_id, url },
      company,
      userType: 'employer',
    });
  }

  if (userPicture) {
    const { public_id, url } = await handleUpload(userPicture);

    newUser = await User.create({
      ...req.body,
      userPicture: { public_id, url },
    });
  }

  const token = newUser.createJWT();
  attachCookie({ res, token });
  newUser.password = undefined;

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: newUser, message: 'Account created!' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email and password are required');
  }

  const userExists = await User.findOne({ email }).select('+password');
  if (!userExists) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await userExists.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  const token = await userExists.createJWT();
  attachCookie({ res, token });
  userExists.password = undefined;

  res
    .status(StatusCodes.OK)
    .json({
      success: true,
      data: userExists,
      message: 'Successfully logged in',
    });
};

export const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: 'Successfully logged out' });
};
