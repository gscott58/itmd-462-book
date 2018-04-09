let mongoose = require("mongoose");
let Book = require('../models/book');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let http = require('http');

let server = http.createServer(app);
let should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  before(done => {
    // Start the server
    server.listen(0);
    done();
  });

  beforeEach(done => { 
    // Before each test we empty the database
    Book.remove({}, (err) => { 
      done();         
    });     
  });

  after(done => {
  // After all tests we close the server and disconnect from the database
  server.close();
  mongoose.disconnect();
  done();
  });

  describe('GET /books', () => {
    it('it should GET all the books', (done) => {
    	let expectedBook = new Book({
    		Book: "MyBook",
    		author: "general",
    		numPages: 2
    	})

    	expectedBook.save(function (err, book) {
  	      if (err) return console.error(err);
          chai.request(server)
              .get('/books')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                done();
              });
  	  });
    });
  });

  describe('POST /books', () => {
    it('it should add a new producs', (done) => {
    	let expectedBook = new Book({
    		Book: "MyBook",
    		author: "general",
    		numPages: 2
    	});

      chai.request(server)
          .post('/books')
          .send(expectedBook)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("id");
            res.body.should.have.property("title").eql(expectedBook.title);
            res.body.should.have.property("author").eql(expectedBook.author);
            res.body.should.have.property("numPages").eql(expectedBook.numPages);
            done();
          });
    });
  }); 


  describe('GET /books/:id', () => {
    it('it should get an existing book', (done) => {
      let existingBook = new Book({
        Book: "MyBook",
        author: "general",
        numPages: 2
      });

      existingBook.save(function (err, book) {
        if (err) return console.error(err);
        chai.request(server)
          .get('/books/' + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("id");
            res.body.should.have.property("title").eql(existingBook.title);
            res.body.should.have.property("author").eql(existingBook.author);
            res.body.should.have.property("numPages").eql(existingBook.numPages);
            done();
          });
      });
    });
  });

  describe('PUT /books/:id', () => {
    it('it should update an existing book', (done) => {
      let existingBook = new Book({
        Book: "MyBook",
        author: "general",
        numPages: 2
      });
      let expectedBook = new Book({
        Book: existingBook.title,
        author: existingBook.author,
        numPages: existingBook.numPages
      });

      existingBook.save(function (err, book) {
        if (err) return console.error(err);
        chai.request(server)
          .put('/books/' + book.id)
          .send(expectedBook)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.empty;

            Book.findOne({_id: existingBook.id}, function(err, foundBook) {
              if (err) return console.error(err);
              foundBook.should.have.property("title").eql(expectedBook.title);
              foundBook.should.have.property("author").eql(expectedBook.author);
              foundBook.should.have.property("numPages").eql(expectedBook.numPages);
              done();
            })
          });
      });
    });
  });

  describe('DELETE /books/:id', () => {
    it('it should delete an existing book', (done) => {
      let existingBook = new Book({
        Book: "MyBook",
        author: "general",
        numPages: 2
      });

      existingBook.save(function (err, book) {
        if (err) return console.error(err);
        chai.request(server)
          .delete('/books/' + book.id)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.empty;

            Book.findOne({_id: existingBook.id}, function(err, book) {
              if (err) return console.error(err);
              should.not.exist(book);
              done();
            })
          });
      });
    });
  });

});