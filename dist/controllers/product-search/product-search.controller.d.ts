import { Request, Response } from 'express';
export declare class ProductSearchController {
    private readonly Category;
    private User;
    constructor(Category: any, User: any);
    fun(req: Request, res: Response, next: any): void;
    getCategories(req: Request, res: Response, next: any): any;
}
