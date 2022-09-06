require("dotenv").config()
const express = require("express")
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require("body-parser")
const router = require("./router/index.js")
const cors = require("cors")

// const whiteList = ["localhost:3000"];
// const corsOption = {
//     origin: function(origin, callback) {
//         if(whiteList.indexOf(origin) != -1) {
//             callback(null, true)
//         } else {
//             callback(new Error("not Allowed by cors"))
//         }
//     }
// }

// app.use(cors(corsOption))
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) 

app.use('/static', express.static('public'));
app.use("/api/v1", router) 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
