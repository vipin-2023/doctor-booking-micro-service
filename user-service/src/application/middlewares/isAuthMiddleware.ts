import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user: any;
}


const secretKey = 'top-secret-001';

export const authenticateClient = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || secretKey, (err: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
      if (err) {
        res.status(403);
      } else {
        req.user = decoded;
        if (decoded.role === 'user') {
          next();
        }
      }
    });
  } else {
    res.status(401).json('');
  }
};
