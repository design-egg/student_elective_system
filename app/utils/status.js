'use strict';

module.exports = {
  SUCCESS: {
    status: 200,
    message: 'Operating Success !!!',
  },
  ERROR: {
    status: 400,
    message: 'Operating Error !!!',
  },
  Unauthorized: {
    status: 401,
    message: 'Token does not exist or has expired !!!',
  },
  Forbidden: {
    status: 403,
    message: 'Forbidden, No right to operate !!!',
  },
  NotFound: {
    status: 404,
    message: '404, NotFound !!!',
  },
  UnprocessableEntity: {
    status: 422,
    message: 'Unprocessable Entity !!!',
  },
  InternalServerError: {
    status: 500,
    message: 'Internal Serve Error !!!',
  },
};
