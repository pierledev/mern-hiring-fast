import { UnAuthenticatedError } from '../errors/index.js';

const employerHandler = (req, res, next) => {
  console.log(req.user.userType);
  if (req.user.userType !== 'employer') {
    throw new UnAuthenticatedError('You have no access to this resource');
  }

  next();
};

export default employerHandler;
