const { constant } = require('../constant');
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  console.log(err);
  if (err)
    switch (statusCode) {
      case constant.NOT_FOUND:
        res.json({
          title: 'Not Found ',
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constant.VALIDATION_ERROR:
        res.json({
          title: 'Validation Faild',
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constant.FORBIDDEN:
        res.json({
          title: 'Validation Faild',
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constant.UNAUTHORIZED:
        res.json({
          title: 'Validation Faild',
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constant.SERVER_ERROR:
        res.json({
          title: 'Validation Faild',
          message: err.message,
          stackTrace: err.stack,
        });
      default:
        console.log('NO error All Good !');
        break;
    }
  else next();
};

module.exports = errorHandler;
