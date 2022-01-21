import { NestMiddleware } from '@nestjs/common';
export declare class CheckJwtMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
