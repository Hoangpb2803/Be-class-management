import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor() { }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization

        if (authHeader && authHeader.split(" ")[0] === "Bearer") {
            const token = authHeader.split(" ")[1]

            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
                req['user'] = decoded
                next()
            } catch (error) {
                throw new UnauthorizedException('Invalid or expired token')
            }
        } else {
            throw new UnauthorizedException('Authorization header is missing or invalid');
        }
    }
}