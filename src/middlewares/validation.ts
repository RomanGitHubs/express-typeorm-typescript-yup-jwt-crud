import { Handler } from 'express';

type errorObj = {
  message: string,
  path: string,
  filed: string,
}

const validate = (schema): Handler => {
  return async (req, res, next) => {
    try {
      
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, {
        abortEarly: false,
      });
      return next();
    } catch (e) {
      const errorArray = e.inner.map((item) => {
        const errorObj: errorObj = {
          message: item.message,
          path: item.path.split('.', 1).toString(),
          filed: item.path.split('.', 2).slice(1).toString(),
        };
        return errorObj;
      });
      return res.status(500).json({ messages: errorArray });
    }
  };
};

export default validate;
