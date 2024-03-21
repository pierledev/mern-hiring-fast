const attachCookie = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const thirtyDays = oneDay * 30;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + thirtyDays),
    secure: process.env.NODE_ENV === 'production',
  });
};

export default attachCookie;
