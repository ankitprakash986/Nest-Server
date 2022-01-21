import { Request, Response } from 'express';
export declare class AccountController {
    private User;
    constructor(User: any);
    SignUp(req: Request, res: Response, next: any): void;
    Login(req: Request, res: Response, next: any): void;
}
