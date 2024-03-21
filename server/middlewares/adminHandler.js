import { UnAuthenticatedError } from '../errors/index.js';

const adminHandler = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    throw new UnAuthenticatedError('You have no access to this resource');
  }

  next();
};

export default adminHandler;
