// Config values from environment variables
module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '30d',
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 5000
  };