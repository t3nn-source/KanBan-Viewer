import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.sendStatus(401); 
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      console.log('Invalid token');
      return res.sendStatus(403);
    }
    const user = decoded as JwtPayload;
    req.user = user;
    return next();
  });
  return;
};
