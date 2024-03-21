import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };

  res
    .status(defaultError.statusCode)
    .json({ success: false, message: defaultError.msg });
};

export default errorHandler;
