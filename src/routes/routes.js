const express = require('express')
const routes = express()
const { signUpUser, signInUser, signUpUserThirdService, signInUserThirdService } = require('../controllers/users')
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
  listOrderItems,
  deleteUserOrder,
  deleteItemOrder
} = require('../controllers/orders')
const { signUpAdmin, signInAdmin } = require('../controllers/admin')

routes.post('/', signInUser)
routes.post('/signup', signUpUser)
routes.post('/signinthirdservice', signInUserThirdService)
routes.post('/signupthirdservice', signUpUserThirdService)

routes.post('/admin/signup', signUpAdmin)
routes.post('/admin', signInAdmin)

routes.post('/categories', userVerification, createCategories)
routes.get('/categories', userVerification, listCategories)
routes.put('/categories/:id', userVerification, updateCategories)
routes.delete('/categories/:id', userVerification, deleteCategories)

routes.post('/products', userVerification, addProduct)
routes.get('/products', userVerification, listProducts);
routes.put('/products/:id', userVerification, updateProducts);
routes.delete('/deleteproducts/:id', userVerification, deleteProduct);

routes.post('/userorder', userVerification, userOrder)
routes.get('/userorder/:id', userVerification, listOrder)
routes.delete('/userorder/:id', userVerification, deleteUserOrder)

routes.post('/orderitem', userVerification, orderItem)
routes.get('/orderitems/:id/:orderid', userVerification, listOrderItems)
routes.delete('/orderitems/:id/:orderid', userVerification, deleteItemOrder)

module.exports = routes;