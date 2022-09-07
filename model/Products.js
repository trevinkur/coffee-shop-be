const db = require("../helper/db_connection")
const slugify = require("slugify");
const fs = require("fs");

module.exports = {
    get: function(req,res) {
        return new Promise((resolve,reject) => {
            const {sortby="name", order="asc", limit=3, page=1, search='', category} = req.query;
            const offset = (page - 1) * limit;
            sql = `SELECT categories.category_name AS category,
            categories.category_id, products.slug,
            products.name, price, cover,
            product_id
            from products 
            JOIN categories 
            ON products.category_id = categories.category_id
            WHERE products.name LIKE '%${search}%'
            ${category ? `AND categories.category_name = '${category}'`: ''} 
            ORDER BY products.${sortby} ${order} LIMIT ${limit} OFFSET ${offset}
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
    getBySlug: function(req,res) {
        return new Promise((resolve,reject) => {
            const {slug} = req.params
            sql = `SELECT categories.category_name AS category,
            categories.category_id,
            products.name, price, cover,
            product_id, products.description
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
            const {name, cover, category_id, price, description} = req.body
            const slug = slugify(name, {lower: true})
            const sql = `INSERT INTO products (name, slug, cover, category_id, price, description) 
                VALUES('${name}', '${slug}', '${cover}', '${category_id}', ${price}, '${description}')
            `;
            db.query(sql,(err,results) => {

                if(err) {
                    fs.unlink(`./public/${req.file.filename}`,(err,results) => {})
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