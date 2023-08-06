// создание токена
const jwt = require('jsonwebtoken');
// подключаем обработчик класса ошибки
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
// поддключаем файл с константами
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorUnauthorized(UNAUTHORIZED_ERROR_MESSAGE));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new ErrorUnauthorized(UNAUTHORIZED_ERROR_MESSAGE));
  }
  req.user = payload;
  return next();
};
