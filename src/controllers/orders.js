const knex = require('../services/conection')

const userOrder = async (req, res) => {
  const {
    user_id,
    adress,
    cpf,
    payment_type,
    price,
    discount,
    tax,
    total_price
  } = req.body

  if (!user_id || !adress || !cpf || !payment_type) {
    return res.status(400).json({
      messangem: 'Os campos id, endereço, cpf e tipo de pagamento devem ser preenchidos!'
    })
  }

  try {
    const order = await knex('user_order')
      .insert({
        user_id, adress, cpf, payment_type, price, discount, tax, total_price
      }).where('user_id', user_id).returning('*')

    return res.status(202).json(order)

  } catch (error) {
    console.log(error)
  }
}

const orderItem = async (req, res) => {
  const { order_id, product_id, quantity } = req.body

  if (!order_id || !product_id || !quantity) {
    return res.status(400).json({
      menssagem: 'Número da ordem, id do produto e quantidade são obrigatórios!'
    })
  }

  try {
    const orders = await knex('user_order')
    const lastOrder = orders.length

    const addItem = await knex('order_item')
      .insert({ order_id, product_id, quantity })
      .where({ id: lastOrder }).returning('*')

    return res.status(202).json(addItem)

  } catch (error) {
    return res.status(400).json(error)
  }

}

const listOrder = async (req, res) => {
  const { id } = req.params

  try {
    const response = await knex('user_order').where('user_id', id).returning('*')

    return res.status(200).json(response)

  } catch (error) {
    return res.status(500).json(error)
  }
}

const listOrderItems = async (req, res) => {
  const { id, orderid } = req.params

  try {
    const response = await knex('user_order')
      .select(
        'user_order.user_id',
        'order_item.order_id',
        'order_item.product_id',
        'order_item.quantity'
      )
      .leftJoin('order_item', 'order_item.order_id', 'user_order.id')
      .whereNotNull('order_item.quantity')
      .where('user_id', id)
      .andWhere('order_item.order_id', orderid)

    return res.status(200).json(response)

  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteOrder = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ menssagem: 'É necessário informar um ID.' })
  }

  try {
    const response = await knex('user_order').del().where('id', id).returning('*')

    return res.status(200).json({ menssagem: `Ordem ${response[0].id} deletado com sucesso!` })

  } catch (error) {
    return res.status(400).json(error.detail)
  }
};


module.exports = {
  userOrder,
  orderItem,
  listOrder,
  listOrderItems,
  deleteOrder
}