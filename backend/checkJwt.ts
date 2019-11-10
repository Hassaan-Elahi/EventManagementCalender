
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {environment} from "./environment";


export const checkJwt = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        
        
        if (!req.cookies.token || req.cookies.token === null || req.cookies.token === '') {
            console.error('Jwt Token Not available');
             res.status(401).json({message: 'unauthorized'});
        }
    
        const token = req.cookies.token as string;
        
        let jwtPayload;

        // Try to validate the token and get data
        try {
        
            jwtPayload = jwt.verify(token, environment.JWT_SECRET) as any;
            res.locals.currentUserId = jwtPayload.userId;
        
        } catch (exception) {
            // If token is not valid, respond with 401 (unauthorized)
            // console.error('exception in checking jwt token', exception);
            res.status(401).json({message: 'unauthorized'});
            
        }

        // refresh token
        const userId = jwtPayload;
        const newToken = jwt.sign(userId, environment.JWT_SECRET);
        res.cookie("token", newToken, { httpOnly:true });

        // Call the next middleware or controller
        next();
    };
};
