import mongoose from "mongoose";

//post schema here

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: false,
  },
  createdDate: {
    type: Date,
  },
});

const post=mongoose.model('post', postSchema); //(nameof collection)

export default  post;
