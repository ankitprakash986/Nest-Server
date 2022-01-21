import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import {Request,Response } from 'express';
import {async} from 'async';
import {algoliasearch} from 'mongoose-algolia'
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
const Product=require('../../Models/product');
// const client = algoliasearch("KW06GS4929", "ca7080fd8e24ae3f2ad56e68af784fc5");
import { CategorySchema } from 'src/Models/category';
import { Model } from 'mongoose';
@Controller('/api/')
export class ProductSearchController {

    constructor(@InjectModel('Cat') private readonly Category,@InjectModel('UserDetail') private User){}
    @Get('/search')
    
     fun(@Req() req:Request,@Res() res:Response,@Next() next){
        const perPage = 10;
  const page:any = req.query.page;
  console.log(req.query.query);
  var regex = new RegExp([req.query.query].join(""), "i");
  console.log(regex);
  async.parallel(
    [
      function (callback) {
        Product.count({}, (err, count) => {
          var totalProducts = count;
          callback(err, totalProducts);
        });
      },
      function (callback) {
        Product.find({
            isDeleted: false,
            title: regex
          })
          .skip(perPage * page)
          .limit(perPage)
          .populate("category")
          .populate("owner")
          .exec((err, products) => {
            if (err) return next(err);
            callback(err, products);
          });
      },
    ],
    function (err, results) {
      var totalProducts = results[0];
      var products = results[1];

      res.json({
        success: true,
        message: "Product",
        products: products,
        totalProducts: totalProducts,
        pages: Math.ceil(totalProducts / perPage),
        currentProducts: products.length,
      });
    }
  );
    }

    @Get('/categories')
    getCategories(@Req() req:Request,@Res() res:Response,@Next() next)
    {
      // find(id: string) {
        return this.Category.findById('5eae0460a0b6c82c10b7dbe7').exec();
      // }
      this.Category.find({}, (err, categories) => {
        console.log(categories);
        res.json({
          success: true,
          message: "Success",
          categories: categories,
        });
        if(err){
          console.log(err);
        }
      });
    }
}
