const ProductSize = require("../model/ProductSize")

module.exports = {
    getSize: async function(req,res) {
        try {
            const result = await ProductSize.get(req,res)
            return res.send(result) 
        } catch(err) {
            return res.status(err.status ? err.status : 500).send(err)
        }

    },
    addSize: async function(req,res) {
        try {
            const result = await ProductSize.add(req,res)
            return res.send(result) 
        } catch(err) {
            return res.status(err.status ? err.status : 500).send(err)
        }

    }
}