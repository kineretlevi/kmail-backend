import { Request, Response, NextFunction } from 'express';
import { userNameRegex } from '../utils/consts';

const userNameMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { user } = req.params;
  
  // Check if the email matches the pattern
  if (userNameRegex.test(user)) {
    next();
  } else {
    res.status(400).json({ message: 'Invalid format' });
  }
};

export default userNameMiddleware