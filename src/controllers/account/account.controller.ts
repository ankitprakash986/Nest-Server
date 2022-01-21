import { Controller, Get, Post,Req,Res,Next, Inject } from '@nestjs/common';
import {Request,Response } from 'express';
const jwt = require("jsonwebtoken");
import User from 'src/Models/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

const Order = require('../../Models/order');

const checkJWT=require("../../middleware/check-jwt.middleware")

const config=require("../../config")


@Controller('/api/accounts')
export class AccountController {
    constructor(@InjectModel('UserDetail') private User){ }
    @Post('/signup')
    SignUp(@Req() req:Request,@Res() res:Response,@Next() next){
        let user = new this.User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        // user.picture = user.gravatar();
        user.isSeller = req.body.isSeller;
        console.log(user);
        this.User.findOne({
          email: req.body.email
        }, (err, existingUser) => {
          if (existingUser) {
            res.json({
              success: false,
              message: "Account with that email is already exists",
            });
          } else {
            user.save();
            
            var token = jwt.sign({
                user: user,
              },
              config.secret, {
                expiresIn: "7d",
              }
            );
      
            res.json({
              success: true,
              message: "Token Success",
              token: token,
            });
      
            
            
          }
        });
      }

    @Post('/login')
    Login(@Req() req:Request,@Res() res:Response,@Next() next){
         this.User.findOne({
            email: req.body.email
          }, (err, user) => {
            if (err) throw err;
        
            if (!user) {
              res.json({
                success: false,
                message: "User account cannot be found",
              });
            } else if (user) {
              var validPassword = user.comparePassword(req.body.password);
              if (!validPassword) {
                res.json({
                  success: false,
                  message: "Incorrect password",
                });
              } else {
                var token = jwt.sign({
                    user: user,
                  },
                  config.secret, {
                    expiresIn: "7d",
                  }
                );
        
                res.json({
                  success: true,
                  mesage: "Enjoy your token",
                  token: token,
                });
              }
            }
          });
    }

    // @Get('/profile')
    // profile(checkJWT,@Req() req:Request,@Res() res:Response,@Next() next){
    //     User.findOne({
    //       _id: req.decoded.user._id
    //     }, (err, user) => {
    //       res.json({
    //         success: true,
    //         user: user,
    //         message: "Successful",
    //       });
    //     });
    //   }

    
}
