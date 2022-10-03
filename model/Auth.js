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
                                status: 400,
                                detail: err
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
    login: function(req, res) {
        return new Promise((resolve, reject) => {
            const {email, password} = req.body 
            const sql = `SELECT user_id, role, password FROM users WHERE email='${email.toLowerCase()}' `
            db.query(sql, (err, results) => {
                if(err) {
                    if(err.code = "ER_DUP_ENTRY") {
                        reject({
                            message: "maaf/password salah",
                            status: 400
                        })
                    }
                    reject({
                        message: err,
                        status: 500
                    })
                } else if(results.length === 0) {
                    reject({
                        message: "email tidak ada",
                        status: 400,
                    })
                } else {
                    bcrypt.compare(password, results[0].password, (err, result) => {

                        if(err) {
                            reject({
                                reject: "ada error",
                                status: 500
                            })
                        }
                        
                        if(result) {
                            resolve({
                                message: "login success",
                                data: {
                                    token: jwt.sign({userId: results[0].user_id, role: results[0].role},
                                        process.env.PRIVATE_KEY, {expiresIn: "1d"} ),
                                    role : results[0].role,
                                    userId: results[0].user_id
                                }
                            })
                        } else {
                            reject({
                                reject: "email/password salah",
                                status: 400
                            })
                        }
                    })
                }

            })
        })
    }
}