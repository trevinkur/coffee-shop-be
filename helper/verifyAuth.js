const jwt = require("jsonwebtoken");

function verifyAuth (req, res) {

    if(!req.headers.authorization) {
        return res.status(401).send({
            message: "unauthorized",
            status: 401
        })
    } else {
        jwt.verify(req?.headers?.authorization, process.env.PRIVATE_KEY, (err, decoded) => {

            if(decoded?.role === "admin") {
                return
            } else {
                res.status(403).send({
                    message: "forbidden",
                    status: 403
                })
            }
        })
    }
}

module.exports = verifyAuth