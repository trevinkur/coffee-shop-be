const jwt = require("jsonwebtoken");

function verifyUser (req, res) {

    if(!req.headers.authorization) {
        return res.status(401).send({
            message: "unauthorized",
            status: 401
        })
    } else {
        jwt.verify(req?.headers?.authorization, process.env.PRIVATE_KEY, (err, decoded) => {
            const userParams = req.params;
            const userBody = req.body.user_id;
            const userQuery = req.query.userId;
            if(decoded.userId === "admin" || decoded.userId === userParams || 
            decoded.userId === userBody || decoded.userId === userQuery ) {
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

module.exports = verifyUser