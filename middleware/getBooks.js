module.exports = (objRep)=>{
    const{bookModel}=objRep;
    return (req, res, next)=>{

        const s=req.query.s
        let books=bookModel.find()
        if(s){
            books=books.filter(e=>e.title.includes(s)||e.author.includes(s));
        }
        
        res.locals.books=books
        res.locals.s=s||''
        return next();
    }

}