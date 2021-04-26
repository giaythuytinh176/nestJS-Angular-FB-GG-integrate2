import { Request, Response } from 'express';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
export declare class corsMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
