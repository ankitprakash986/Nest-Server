import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ReviewSchema = new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: String,
    description: String,
    rating: {
      type: Number,
      default: 0
    },
    created: {
      type: Date,
      default: Date.now
    },
  });
  
  //Exporting the Review schema to reuse
  module.exports = mongoose.model("Review", ReviewSchema);