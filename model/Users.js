const bcrypt = require("bcrypt");
const db = require("../helper/db_connection")
const jwt = require("jsonwebtoken")

module.exports = {
    register: function(req,res) {
        return new Promise((resolve, reject) => {
            const {email, password, first_name, last_name, phone_number, display_name} = req.body
            bcrypt.hash(password, 10, (err, hash) => {

                const sql = `INSERT INTO users(email, password, first_name, last_name, display_name, phone_number) 
                VALUES("${email}", "${hash}", "${first_name}", "${last_name}", "${display_name}", "${phone_number}")`
                db.query(sql,(err, result) =>{

                    if(err) {
                        if(err.code = "ER_DUP_ENTRY") {
                            reject({
                                message: "maaf email sudah ada",
                                status: 400
                            })
                        }
                        reject({
                            message: err,
                            status: 500
                        })
                    }
                    resolve({
                        message: "Restration Success",
                        status: 200,
                        data: result
                    })
                } )
            })
           
        })
    },

    getId: function(req, res) {
        return new Promise((resolve, reject) => {
            
            const {userId} = req.params 
            const sql = `SELECT * FROM users WHERE user_id='${userId}' `
            db.query(sql, (err, result) => {
                
                if(err) {
                    reject({
                        message: err,
                        status: 500
                    })
                } else if(result.length === 0) {
                    reject({
                        message: "user tidak ada",
                        status: 400,
                    })
                } else {
                    resolve({
                        message: "Success",
                        status: 200,
                        data: result
                    })
                }

            })
        })
    }
}