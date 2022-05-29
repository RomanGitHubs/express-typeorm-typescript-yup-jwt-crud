import { Handler } from 'express';
import { verifyToken } from '../utils/token';
import generateError from '../utils/generateError';
import { userBase } from '../db';

const verifyAccess: Handler = async (req, res, next) => {

  try {
    if (!req.headers.authorization) {
      throw generateError('Need access token', 403);
    }

    const accessToken = (req.headers.authorization as string).split(' ')[1];
    const decoded = verifyToken(accessToken);

    if (!decoded) return res.status(401).json({ message: 'User not found' });

    req.user = await userBase.findOne({ where: { id: decoded.id } });
    next();

  } catch (e) {
    console.log(e.name)
    if (e.name === 'JsonWebTokenError') {
      e.text = 'JsonWebTokenError';
      e.status = 401;
    }
    if (e.name === 'TokenExpiredError') {
      e.text = 'Bad access token';
      e.status = 401;
    }
    if (!e.text) {
      e.text = 'Error  editUser service';
    }
    next(e);
  }
};

export default verifyAccess;
