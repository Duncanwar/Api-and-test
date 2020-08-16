const express = require('express');
const bookController = require('../controllers/bookController');

function router(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.sendStatus(404).send(err);
      }
      console.log(book)
      req.book = book;
      return next();
    });
  });
  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      const returnBook = req.book.toJSON();

      returnBook.links = {};
      // how to replace space
      const genre = req.book.genre.replace(' ', '%20');
      returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      res.json(returnBook);
    })
    .put((req, res) => {
      const { book } = req;
     // console.log(req)
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      console.log(book)
       if (req.body.id) {
        delete req.body.id;
       }
      Object.entries(req.body).forEach((item) => {
        console.log(item)
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return bookRouter;
}

module.exports = router;
