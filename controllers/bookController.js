const { book } = require("../models/books")

class BookController {

    static async createBook(req,res,next){
        let {title, author, category, quantity, price, description} = req.body
        const images = []
        req.files.map(e=>{
            images.push({
                name: e.filename,
                image:{
                    data:e.filename,
                    contentType: e.mimetype
                }
            })
        })

        try{
            const create_book = await book.create({
                title, author, category, images, quantity, price, description
            });

            if (create_book){
                console.log("Book created")
                res.status(201).json({
                    status_code:201,
                    message: "Success created book",
                    data:{
                        title, author, category, images, quantity, price, description
                    }
                })
            }

        } catch(err){
            res.status(400).json({
                status_code:400,
                message: "Error Add Book"
            })
        }
    }

    static async books(req,res,next){
        try{
            const books = await book.find({})
            if (books){
                res.status(200).json({
                    status_code:200,
                    message: "Show Books",
                    data:books
                })
            }
        } catch(err){
            console.log(err)
            res.status(400).json({
                status_code:400,
                message: "Not Found"
            })
        }
    }
}

module.exports = BookController