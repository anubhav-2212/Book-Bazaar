import Books from "../models/books.models.js";   
export const addBooks=async(req,res)=>{
    try {
        const userId=req.user.id
        const{title,author,description,price,category}=req.body;
    if(!title||!author||!description||!price||!category){
        return res.status(401).json({
            success:false,
            message:"Credentails Missing"
        })
    }
    const newBook=await new Books({
        title,
        author,
        description,
        price,
        category,
        userId
    })

    await newBook.save()
    res.status(201).json({
        success:true,
        message:"Book Added Successfully",
        data:newBook
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })  
        
    }

    
}

export const getAllBooks=async(req,res)=>{
    try {
         const allBooks=await Books.find()
    if(!allBooks||allBooks.length===0){
        return res.status(401).json({
            success:false,
            message:"No Books Found"
        })
    }
    res.status(200).json({
        success:true,
        data:allBooks
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
    }
   
}
export const bookDetails=async(req,res)=>{
    try {
        const id=req.params.id;
         if(!bookId){
        return res.status(401).json({
            success:false,
            message:"Book Id not Found"
        })
    }
    // console.log(id)
    const book=await Books.findById(id)
    
    if(!book){
        return res.status(400).json({
            success:false,
            Message:"Book Not Found"
        })
    }
    // console.log(book);

    res.status(200).json({
        success:true,
        Message:"Book found Successfully",
        data:book
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error
        })
        
    }
    




}
export const updateBook=async(req,res)=>{

    try {
         const bookId=req.params.id;
          if(!bookId){
        return res.status(401).json({
            success:false,
            message:"Book Id not Found"
        })
    }

    // console.log(bookId);
    const book=await Books.findByIdAndUpdate(bookId,req.body,{new:true})
    if(!book){
        return res.status(401).json({
            success:false,
            message:"book Not updated"
        })
    }
    // console.log(book);
    res.status(200).json({
        success:true,
        message:"Book Updated Successfully",
        book

    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error
        })
        
    }
   

}
export const deleteBook=async(req,res)=>{
    try {
         const bookId=req.params.id;
    if(!bookId){
        return res.status(401).json({
            success:false,
            message:"Book Id not Found"
        })
    }
    // console.log(bookId);
    const book=await Books.findByIdAndDelete(bookId)
    if(!book){
         return res.status(401).json({
            success:false,
            message:"Book not Found"
        })
        
    }
    // console.log(book);
    res.status(200).json({
        success:true,
        message:"Book Deleted Successfully"
        })
        
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error
        })
        
        
    }
   
}