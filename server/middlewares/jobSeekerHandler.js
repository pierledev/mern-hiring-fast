import { UnAuthenticatedError } from '../errors/index.js';

const jobSeeker = (req, res, next) => {
  if (req.user.userType !== 'job-seeker') {
    throw new UnAuthenticatedError('You have no access to this resource');
  }

  next();
};

export default jobSeeker;
