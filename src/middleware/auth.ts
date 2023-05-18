import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = '654321';
export const REFRESH_SECRET_KEY: Secret = '8765432';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;
   
   const t: any = jwt.decode(token)
   req.body['token'] = t
   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};