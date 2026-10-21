module.exports = (objRep)=>{
    const{bookModel}=objRep;
    return (req,res,next)=>{
        const book=bookModel.findOne({id:req.params.id});

        if(!book){
            return res.status(404).json({error: `Book not found ${req.params.id}`})
        }
        
        res.locals.book=book;
        next();
    }
}