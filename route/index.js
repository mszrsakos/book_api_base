const uuid=require('uuid');
const getBooksMW=require('../middleware/getBooks');
const getBookMW=require('../middleware/getBook');
const createBookMW=require('../middleware/createBook');
const deleteBookMW=require('../middleware/deleteBook');
const updateBookMW=require('../middleware/updateBook');
const searchBookMW=require('../middleware/searchBook');
const renderMW=require('../middleware/render');





function addRoutes(app, db, bookModel){

    const objRep={
        bookModel,
        db,
        uuid
    }

    //böngésző
    app.get('/', getBooksMW(objRep), renderMW(objRep, 'index'));
    app.get('/newbook', renderMW(objRep,'newbook'));
    app.post('/newbook', createBookMW(objRep), (req,res,next)=>res.redirect('/'));
    app.get('/deletebook/:id', getBookMW(objRep),deleteBookMW(objRep), (req,res,next)=>res.redirect('/'));
    app.get('/editbook/:id',getBookMW(objRep) , renderMW(objRep, 'newbook'));
    app.post('/editbook/:id', getBookMW(objRep), updateBookMW(objRep), (req,res,next)=>res.redirect('/') )



    //json valaszok
    app.get('/api/book', getBooksMW(objRep), (req, res, next) => res.json(res.locals.books));
    app.post('/api/book', createBookMW(objRep), (req, res, next) => res.json(res.locals.book).status(201));
    app.get('/api/book/:id', getBookMW(objRep), (req, res, next) => res.json(res.locals.book)) ;
    app.delete('/api/book/:id', getBookMW(objRep), deleteBookMW(objRep), (req, res, next) => res.json(res.locals.books));
    app.patch('/api/book/:id', getBookMW(objRep), updateBookMW(objRep), (req, res, next) => res.json(res.locals.book));
    app.post('/api/search', searchBookMW(objRep), (req, res, next) => res.json(res.locals.books));

}


module.exports=addRoutes;