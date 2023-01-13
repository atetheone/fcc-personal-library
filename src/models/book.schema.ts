import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  commentcount: {
    type: Number,
    default: 0
  },
  comments: {
    type: [String]
  }
});

const Book = model("book", BookSchema);

export { Book };