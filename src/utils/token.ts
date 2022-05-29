import * as jwt from 'jsonwebtoken';
import config from '../config';

export const signToken = (payload) => {
  return jwt.sign(payload, config.tokenSecretKey, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.tokenSecretKey);
};
