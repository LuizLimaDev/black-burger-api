const express = require('express')
const routes = express()
const { singUpUser, singInUser } = require('../controllers/users')
const userVerification = require('../middlewares/authentication')
const {
  createCategories,
  listCategories,
  updateCategories,
  deleteCategories
} = require('../controllers/categories')
const {
  listProducts,
  addProduct,
  updateProducts,
  deleteProduct
} = require('../controllers/products')
const {
  userOrder,
  orderItem,
  listOrder,
  listOrderItems
} = require('../controllers/orders')
const { singUpAdmin, singInAdmin } = require('../controllers/admin')

routes.post('/singup', singUpUser)
routes.post('/singin', singInUser)

routes.post('/admin/singup', singUpAdmin)
routes.post('/admin', singInAdmin)

routes.use(userVerification)

routes.post('/categories', createCategories)
routes.get('/categories', listCategories)
routes.put('/categories/:id', updateCategories)
routes.delete('/categories/:id', deleteCategories)

routes.post('/products', addProduct)
routes.get('/products', listProducts);
routes.put('/products/:id', updateProducts);
routes.delete('/deleteproducts/:id', deleteProduct);

routes.post('/userorder', userOrder)
routes.post('/orderitem', orderItem)
routes.get('/userorder/:id', listOrder)
routes.get('/orderitems/:id/:orderid', listOrderItems)

module.exports = routes;