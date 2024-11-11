import { Request, Response, NextFunction } from 'express';
import { userNameRegex } from '../utils/consts';

const validateRequestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { sender, receiver } = req.body;

  // Validate sender name format
  if (!sender || !userNameRegex.test(sender)) {
    res.status(400).json({ message: 'Invalid sender name format.' });
  }

  // Validate receiver name format
  if (!receiver || !userNameRegex.test(receiver)) {
    res.status(400).json({ message: 'Invalid receiver name format.' });
  }

  next();
};

export default validateRequestMiddleware;
