const Coupon = require("../model/Coupon")

module.exports = {
    getCoupon: async function(req,res) {
        try {
            const result = await Coupon.get(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err.status).send(err)
        }
    },
    getCouponByCode: async function(req,res) {
        try {
            const result = await Coupon.getByCode(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err.status).send(err)
        }
    },
    addCoupon: async function(req,res) {
       
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
            const result = await Coupon.add(reqModified,res)
            return res.send(result)
        } catch(err) {
            return res.send(err)
        }
    },
    
    
}