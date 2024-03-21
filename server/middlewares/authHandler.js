import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const authHandler = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnAuthenticatedError(
      'Authentication invalid. Please try to logout and login again.'
    );
  }

  try {
    const payload = jwt.verify(token, process.env.JWt_SECRET);
    req.user = {
      userId: payload.userId,
      userType: payload.userType,
      company: payload.company,
    };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication invalid');
  }
};

export default authHandler;
