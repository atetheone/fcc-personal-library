import { Router, Request, Response } from "express";
import { 
  getBooks, 
  addBook, 
  deleteBooks, 
  getBookById, 
  deleteBookById,
  addComment
} from "../controllers/bookController";

const apiRouter = Router();

apiRouter.route('/api/books')
  .get(async (req: Request, res: Response) => {
    //response will be array of book objects
    //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    const result = await getBooks();
    res.json(result)
  })
  
  .post(async (req: Request, res: Response) => {
    let { title } = req.body;
    //response will contain new book object including atleast _id and title
    if (!title) return res.send("missing required field title");
    
    const result = await addBook(title);
    const { _id } = result;
    // console.log(result);
    if (!result?.error) 
      res.status(201).json({ _id, title });
    // res.status(501).json(b)
  })
  
  .delete(async (req: Request, res: Response) => {
    //if successful response will be 'complete delete successful'
    await deleteBooks();
    res.json('complete delete successful');
  });



  apiRouter.route('/api/books/:id')
  .get(async (req: Request, res: Response) => {
    let bookid = req.params.id;

    if (!bookid.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send("no book exists");
    }
    //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    const result = await getBookById(bookid);
    if (!result) return res.send("no book exists");
    res.json(result)
  })
  
  .post(async (req: Request, res: Response) => {
    let bookid = req.params.id;
    let comment = req.body.comment;

    if (!comment) return res.send('missing required field comment');
    if (!bookid.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send("no book exists")
    }
    //json res format same as .get
    const result = await addComment(bookid, comment);
    if (!result) return res.send("no book exists");
    if (!result.error) return res.json(result);
  })
  
  .delete(async (req: Request, res: Response) => {
    let bookid = req.params.id;
    
    if (!bookid.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send("no book exists")
    }
    //if successful response will be 'delete successful'
    try { 
      const deleted = await deleteBookById(bookid);
      // console.log(deleted)
      if (deleted.deletedCount === 0) return res.send("no book exists");
      res.send("delete successful");
    } catch (err) {
      console.log(err);
    }
  });

export { apiRouter };