import * as mongoose from 'mongoose';

import { Schema } from 'mongoose';
import {deepPopulate} from  'mongoose-deep-populate'
export const OrderSchema = new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    totalPrice: {
      type: Number,
      default: 0
    },
    products: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      },
    }, ],
  });
  
  //Using deep-populate to facilitate rating feature
  // OrderSchema.plugin(deepPopulate);
  
  //Exporting the Order schema to reuse
  module.exports = mongoose.model("Order", OrderSchema);