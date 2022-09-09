const db = require("../helper/db_connection")
const slugify = require("slugify");
const fs = require("fs");

module.exports = {
    getByUser: function(req,res) {
        return new Promise((resolve,reject) => {
            const {sortby="name", order="asc", limit=5, page=1, status} = req.query;
            const {user_id} = req.params
            const offset = (page - 1) * limit;
            console.log(user_id, "ini dari orders")
            sql = `SELECT users.display_name AS name, 
            products.name as product, orders.size, 
            SUM(product_size.price) AS total_price,
            COUNT(products.product_id) as quantity, 
            orders.status, payment_method, orders.update_at,
            products.product_id, products.cover
            from orders
            JOIN users 
            ON orders.user_id = users.user_id
            JOIN products
            ON orders.product_id = products.product_id
            JOIN product_size
            ON orders.product_id = product_size.product_id AND orders.size = product_size.size
            WHERE users.user_id = ${user_id} AND
            orders.status = '${status}'
            GROUP BY product_size.product_id, product_size.size
            ${status === "fulfilled" ? ", orders.update_at" : ""}
            ORDER BY ${status === "fulfilled" ? `orders.update_at desc` : `products.${sortby} ${order}`} LIMIT ${limit} OFFSET ${offset}
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    reject({
                        message: err,
                        status: 500
                    })
                }
                if(results?.length === 0) {
                    resolve({
                        message: "data tidak ada",
                        status: 200,
                        data: results
                    })
                }
                resolve({
                    message: "success",
                    status: 200,
                    data: results
                })
            })
        })
    },
    getBySlug: function(req,res) {
        return new Promise((resolve,reject) => {
            const {slug} = req.params
            sql = `SELECT categories.category_name AS category,
            categories.category_id,
            products.name, price, cover,
            product_id
            from products 
            JOIN categories 
            ON products.category_id = categories.category_id
            WHERE products.slug = '${slug}'
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    reject({
                        message: err,
                        status: 500
                    })
                }
                if(results?.length === 0) {
                    resolve({
                        message: "data tidak ada",
                        status: 200,
                        data: []
                    })
                }
                resolve({
                    message: "success",
                    status: 200,
                    data: results
                })
            })
        })
    },
    add: function(req,res) {
        return new Promise((resolve,reject) => {
            console.log(req.body)
            const {product_id, user_id, size} = req.body
            const sql = `INSERT INTO orders (product_id, user_id, size) 
                VALUES('${product_id}', ${user_id}, "${size}")
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    if(err.code === "ER_DUP_ENTRY") {
                        reject({
                            message: "there is already name like that",
                            status: 400
                        })
                    }
                    reject({
                        message: err,
                        status: 500
                    })
                }
                if(results?.length === 0) {
                    resolve({
                        message: "data tidak ada",
                        status: 200,
                        data: []
                    })
                }

                resolve({
                    message: "success",
                    status: 200,
                    data: results
                })
            })
        })
    },
    update: function(req,res) {
        return new Promise((resolve,reject) => {
            const {payment_method, status} = req.body
            const {productId, userId} = req.query
            const sql = `UPDATE orders SET payment_method="${payment_method}",
            status="${status}" WHERE user_id=${userId} ${ productId ? `AND product_id=${productId}`: ''} 
            AND status='in_cart'  
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    if(err.code === "ER_DUP_ENTRY") {
                        reject({
                            message: "there is already name like that",
                            status: 400
                        })
                    }
                    reject({
                        message: err,
                        status: 500
                    })
                }
                if(results?.length === 0) {
                    resolve({
                        message: "data tidak ada",
                        status: 200,
                        data: []
                    })
                }

                resolve({
                    message: "success",
                    status: 200,
                    data: results
                })
            })
        })
    },
    softDelete: function(req,res) {
        return new Promise((resolve,reject) => {
            console.log("ini dari delete")
            const {status} = req.body
            const {productId, userId, date, size} = req.query
            const sql = `UPDATE orders SET 
            status="delete" WHERE user_id=${userId} AND product_id = ${productId} AND update_at="${date}"
            AND size='${size}'  
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    if(err.code === "ER_DUP_ENTRY") {
                        reject({
                            message: "there is already name like that",
                            status: 400
                        })
                    }
                    reject({
                        message: err,
                        status: 500
                    })
                }
                if(results?.length === 0) {
                    resolve({
                        message: "data tidak ada",
                        status: 200,
                        data: []
                    })
                }

                resolve({
                    message: "success",
                    status: 200,
                    data: results
                })
            })
        })
    },
}