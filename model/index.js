const con = require('../config/index')
const {hash,compare,hashSync} = require('bcrypt');
const {createToken} = require('../middleware/Authentication')

class User {
getUsers(req, res) {
    con.query("SELECT * FROM users", (err, result) => {
    if (err) throw err;
    res.send(result);
    });
}
getUser(req, res) {
    con.query("SELECT * FROM users WHERE userID = ?;", [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
    });
}
async createUser(req, res) {
    const userInfo = req.body;
    userInfo.pass = await hash(userInfo.pass, 15)
    con.query("INSERT INTO users SET ?;", [userInfo], (err) => {
    if (err) {
        res.status(401)
        res.json({ err });
    } else {
        res.status(200)
        res.send({msg: "New user has been added"})
    }
    })
}
async login(req, res) {
    const email = req.body.email
    const pass = req.body.pass

    con.query(
        `SELECT firstName, lastName, email, pass, userRole FROM users WHERE email = '${email}';`,
        async (err, loginData) => {
        if (err) throw err;
        if (loginData == null || !loginData.length) {
            res.status(401)
            res.json({err: "Incorrect email."});
        } else {
            compare(pass, loginData[0].pass, (err, result) => {
            if (err) throw err;
            const jwToken = userAuth.createToken({
                email,
                pass,
            })
            res.cookie("realUser", jwToken, {
                maxAge: 3600000,
                httpOnly: true,
            });
            if (result) {
                res.status(200).json({
                msg: "Log in successful",
                jwToken,
                result: loginData[0],
                });
            } else {
                res.status(401).json({
                err: "The password you have entered is not correct or this account has not been registered.",
                });
            }
            });
        };
        }
    )
    };
    async updateUser(req, res) {
    const userInfo = req.body
    if (userInfo.pass) {
        userInfo.pass = await hash(userInfo.pass, 15)
    }
    con.query('UPDATE users SET ? WHERE userID = ?;', [userInfo, req.params.id], (err) => {
        if (err) throw err;
        res.send([req.body, {msg: "User updated successfully"}])
    })
    };
    deleteUser(req, res) {
    con.query('DELETE FROM users WHERE userID = ?;', [req.params.id], (err) => {
        if (err) throw err;
        res.send([req.body, {msg: "User Deleted Successfully"}])
    })
    }
};

class Product {
getProducts(req, res) {
    req.user
    con.query("SELECT * FROM products", (err, result) => {
    if (err) throw err;
    res.status(200);
    res.send(result);
    });
}
getProduct(req, res) {
    con.query("SELECT * FROM products WHERE ID = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
    });
}
createProduct(req, res) {
    con.query("INSERT INTO products set ? ", [req.body], (err) => {
    if (err) throw err;
    res.send([req.body, {msg: "Product added successfully"}])
    })
}
updateProduct(req, res) {
    con.query('UPDATE products SET ? WHERE ID = ?', [req.body, req.params.id], (err) => {
    if (err) throw err;
    res.send([req.body, {msg: "Product Updated Successfully"}])

    })
}
deleteProduct(req, res) {
    con.query('DELETE FROM products WHERE productID = ?;', [req.params.id], (err) => {
    if (err) throw err;
    res.send([req.body, {msg: "Product Deleted Successfully"}])
    })
}
};
module.exports = {
    User,
    Product
}