const Products = require("../model/Products")

module.exports = {
    getProducts: async function(req,res) {
        try {
            const result = await Products.get(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err.status).send(err)
        }
    },
    getProductBySlug: async function(req,res) {
        try {
            const result = await Products.getBySlug(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err.status).send(err)
        }
    },
    addProduct: async function(req,res) {
       
        try {
            let reqModified = {}
            if(req.file) {
                reqModified = {
                    ...req,
                    body: {
                        ...req.body,
                        cover: req.file.filename
                    }      
                }            
            } else {
                reqModified = req
            }
            const result = await Products.add(reqModified,res)
            return res.send(result)
        } catch(err) {
            return res.send(err)
        }
    },
    
    
}