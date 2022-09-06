const Orders = require("../model/Orders")

module.exports = {
    getOrdersByUser: async function(req,res) {
        try {
            const result = await Orders.getByUser(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err.status).send(err)
        }
    },
    getProductBySlug: async function(req,res) {
        try {
            const result = await Orders.getBySlug(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err.status).send(err)
        }
    },
    addOrders: async function(req,res) {
       
        try {
            const result = await Orders.add(req,res)
            return res.send(result)
        } catch(err) {
            return res.send(err)
        }
    },
    updateOrders: async function(req,res) {
       
        try {
            const result = await Orders.update(req,res)
            return res.send(result)
        } catch(err) {
            return res.send(err)
        }
    },
    softDeleteOrders: async function(req,res) {
       
        try {

            const result = await Orders.softDelete(req,res)
            return res.send(result)
        } catch(err) {
            return res.send(err)
        }
    }
    
}