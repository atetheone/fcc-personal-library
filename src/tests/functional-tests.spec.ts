/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

// const chaiHttp = require('chai-http');
import chaiHttp from "chai-http";
import chai, { assert } from "chai";
import app from "../app";

chai.use(chaiHttp);

let bookid: any;
suite('Functional Tests', function() {

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', () => {
      
      test('Test POST /api/books with title', async () => {
        const resp = await chai
          .request(app)
          .post("/api/books")
          .send({ title: "Book of Hero" })

        bookid = resp.body._id;
        
        assert.equal(resp.status, 201);
        assert.equal(resp.body.title, "Book of Hero");
      });
      
      test('Test POST /api/books with no title given', async () => {
        const resp = await chai
          .request(app)
          .post("/api/books")
          .send({ title: "" });

        assert.equal(resp.status, 200);
        assert.equal(resp.text, "missing required field title");
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books', async () => {
        const resp = await chai
          .request(app)
          .get("/api/books");

        assert.equal(resp.status, 200);
        assert.isArray(resp.body, 'response should be an array');
        assert.property(resp.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(resp.body[0], 'title', 'Books in array should contain title');
        assert.property(resp.body[0], '_id', 'Books in array should contain _id');
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db', async () => {
        const resp = await chai
          .request(app)
          .get("/api/books/643efa72ab");

        assert.equal(resp.status, 200);
        assert.equal(resp.text, "no book exists");
      });
      
      test('Test GET /api/books/[id] with valid id in db', async () => {
        const resp = await chai
          .request(app)
          .get(`/api/books/${bookid}`);

        assert.equal(resp.status, 200);
        assert.equal(resp.body.title, "Book of Hero");
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', async () => {
        const resp = await chai
          .request(app)
          .post(`/api/books/${bookid}`)
          .send({ comment: "The book everybody should read" });

        assert.equal(resp.status, 200);
        assert.equal(resp.body.comments[0], "The book everybody should read");
        assert.equal(resp.body.commentcount, 1);
      });

      test('Test POST /api/books/[id] without comment field', async () => {
        const resp = await chai
          .request(app)
          .post(`/api/books/${bookid}`)
          .send({ comment: "" });

        assert.equal(resp.status, 200);
        assert.equal(resp.text, "missing required field comment");
      });

      test('Test POST /api/books/[id] with comment, id not in db', async () => {
        const resp = await chai
          .request(app)
          .post(`/api/books/4376e767eabc`)
          .send({ comment: "The book everybody should read" });

        assert.equal(resp.status, 200);
        assert.equal(resp.text, "no book exists");
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', async () => {
        const resp = await chai
          .request(app)
          .delete(`/api/books/${bookid}`);

        assert.equal(resp.status, 200);
        assert.equal(resp.text, "delete successful");
      });

      test('Test DELETE /api/books/[id] with  id not in db', async () => {
         const resp = await chai
          .request(app)
          .delete(`/api/books/31333efc349d`);

        assert.equal(resp.status, 200);
        assert.equal(resp.text, "no book exists");
      });

    });

  });

});
