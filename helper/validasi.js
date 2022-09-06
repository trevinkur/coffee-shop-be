const { addCinema } = require("../controller/cinemaController");
const schedule = require("../model/schedule");
const fs = require("fs")


module.exports = {
    img: function(req, res) {
        return new Promise((resolve, reject) => {
            if(req.file.size > 1000000) {
                fs.unlinkSync(`./public/${req.file.filename}`)
                //  res.status(400).send({message: "File terlalu besar"})
                reject({message: "File terlalu besar"})
            }
            format = ["jpeg", "jpg", "png", "webv"]
            error = []
            format.map(str => {
                if(req.file.filename.indexOf(str) === req.file.filename.length - str.length) {
                    console.log(str)
                    return error.push(str)
                }
            });
    
            if(error.length === 0) {
                fs.unlinkSync(`./public/${req.file.filename}`)
                // res.status(400).send({message: "format tidak didukung"}).end()
                reject({message: "format tidak didukung"})
            }
            
            resolve()
        })
        
        
    },
    movieSort: function(sortby, order, limit, page, reject) {
        // column dari database
        const query = ["title", "release_date", "movie_id", "cover", "duration", "description", "categories", "cast"]
            if(!query.find(item => item == sortby)) {
                reject({
                    message: "there is no such column in database",
                    status: 400
                }) 
            }
            if(order.toLowerCase() != "asc" && order.toLowerCase() != "desc" ) {
                console.log(order)
                reject({
                    message: "only accept asc or desc",
                    status: 400
                }) 
            }
            if(limit < 0 || page <= 0) {
                reject({
                    message: "please input correct number in limit or page",
                    status: 400
                })
            }
        
    },
    addMovie: function(title, cover, release_date, duration, director, description, cast, categories, req, reject) {
        console.log(title, cover, release_date, duration, director, description, cast, categories)
        if(!title || !cover || !release_date || !duration || !director || !description || !cast || !categories) {
            fs.unlink(`./public/${req.file.filename}`, (err,result) => {})
            reject({
                message: "please input all data",
                status: 400
            })
            return 0
        }
        return 1
    }
}