const Users = require("../model/Users")

module.exports = {

    register: async function(req, res) {
        try{
            result = await Users.register(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err?.status ? err.status : 500).send(err)
        }
    },
    getUserId: async function(req, res) {
        try{
            console.log("users")
            result = await Users.getId(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err?.status ? err.status : 500).send(err)
        }
    },
}