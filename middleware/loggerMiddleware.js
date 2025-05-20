const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  console.log(`${new Date().toISOString()} | ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${new Date().toISOString()} | ${req.method} ${
        req.originalUrl
      } | Status: ${res.statusCode} | Duration: ${duration}ms`
    );
  });

  next();
};

module.exports = loggerMiddleware;
