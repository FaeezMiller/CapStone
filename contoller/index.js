const express = require('express');
const routes = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const {User, Product} = require('../model');

const user = new User();
const product = new Product();

routes.get('^/$|/blockchain', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, '../view/index.html'));
});

routes.get('/users', (req, res) => {
  user.getUsers(req, res)
});
routes.post('/register', (req, res)=>{
  user.register(req, res)
});
routes.post('/login', (req, res) => {
  user.login(req, res)
});
routes.get('/users/:id', (req, res) => {
  user.getUser(req, res)
});
routes.patch('/users/:id', (req, res) => {
  user.updateUser(req, res)
});
routes.delete('/users/:id', (req, res) => {
  user.deleteUser(req, res)
});
// 
routes.get('/', (req, res) => {
  product.getProducts(req, res)
});
routes.post('/', (req, res) => {
  product.createProduct(req, res)
})
routes.get('/:id', (req, res) => {
  product.getProduct(req, res)
})
routes.patch('/:id', (req, res) => {
  product.updateProduct(req, res)
})
routes.delete('/:id', (req, res) => {
  product.deleteProduct(req, res)
})

module.exports = routes;