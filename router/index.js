const express = require("express");
const app = express();
const ordersRouter = require("./ordersRouter")
const productsRouter = require("./productsRouter");
const authRouter = require("./authRouter");
const productSizeRouter = require("./productSizeRouter");
const usersRouter = require("./usersRouter")
const couponRouter = require("./couponRouter")

app.use("/product/size", productSizeRouter);
app.use("/coupon", couponRouter);  
app.use("/products", productsRouter);
app.use('/orders', ordersRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter)

module.exports = app;