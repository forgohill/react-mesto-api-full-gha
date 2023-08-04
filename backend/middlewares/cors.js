const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://marlo.students.nomoreparties.co',
  'https://marlo.students.nomoreparties.co',
  'http://localhost:3000',
  'https://localhost:3000',
  // 'http://localhost:3000/react-mesto-auth',
  // 'http://localhost:3000/sign-up',
  'http://localhost:3001',
  'https://localhost:3001',
];

module.exports = (req, res, next) => {

  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  console.log(origin);
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  console.log(method);

  const requestHeaders = req.headers['access-control-request-headers'];
  console.log(requestHeaders);

  res.header('Access-Control-Allow-Credentials', true);

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {

    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {

    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);

    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);

    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();

  // const { origin } = req.headers;
  // const { method } = req;
  // const requestHeaders = req.headers['access-control-request-headers'];

  // if (allowedCors.includes(origin)) {
  //   res.header({
  //     'Access-Control-Allow-Origin': origin,
  //     'Access-Control-Allow-Credentials': true,
  //   });
  // }

  // if (method === 'OPTIONS') {
  //   res.header({
  //     'Access-Control-Allow-Headers': requestHeaders,
  //     'Access-Control-Allow-Methods': ALLOWED_METHODS,
  //   });
  //   return res.end();
  // }
  // next();
};
