import { Book } from "../models/book.schema";

export const getBooks = async () => {
  return await Book.find();
};

export const getBookById = async (_id: string) => {
  return await Book.findOne({ _id });
};

export const addBook = async (title: string) => {
  let book: any;
  try {
    book = new Book({
      title
    });
  
    await book.save();
    return book;
  } catch (err) {
    return { error: err }
  }
};

export const addComment = async (bookid: string, comment: string) => {
  let result: any;
  try {
    result = await Book.findOneAndUpdate(
      { _id: bookid },
      {
        $push: { "comments": comment },
        $inc: {
          commentcount: 1
        }
        
      },
      { new: true }
    );

    return result;
  } catch (err) {
    return { error: err };
  }
};

export const deleteBooks = async () => {
  await Book.deleteMany({});
};

export const deleteBookById = async (bookid: string) => {
   return await Book.deleteOne({ _id: bookid }); 
};
