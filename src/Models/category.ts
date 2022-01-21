import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      lowercase: true
    },
    created: {
      type: Date,
      default: Date.now
    },
  });
  
  

  