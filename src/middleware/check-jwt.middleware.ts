import { Injectable, NestMiddleware } from '@nestjs/common';

import jwt from 'jsonwebtoken';

const config = require('../config');

@Injectable()
export class CheckJwtMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.status(401).json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {

        req.decoded = decoded;
        next();

      }
    });

  } else {
    res.status(403).json({
      success: false,
      message: 'No token provided'
    });

  }
  }
}
