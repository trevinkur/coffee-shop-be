const Auth = require("../model/Auth")

module.exports = {

    register: async function(req, res) {
        try{
            result = await Auth.register(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err?.status ? err.status : 500).send(err)
        }
    },
    login: async function(req, res) {
        try{
            result = await Auth.login(req,res)
            return res.send(result)
        } catch(err) {
            return res.status(err?.status ? err.status : 500).send(err)
        }
    },
}