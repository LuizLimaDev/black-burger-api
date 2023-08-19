const knex = require('../services/conection')

const createCategories = async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({
      menssagem: 'Por favor, informe o nome da categoria.'
    })
  }

  try {
    const response = await knex('products_categories')
      .insert({ name }).returning('*')

    return res.status(200).json({ menssagem: `Categoria ${name} adicionada!` })

  } catch (error) {
    return res.status(500).json(error)
  }

}

const listCategories = async (req, res) => {
  try {
    const response = await knex('products_categories')

    return res.status(200).json(response)

  } catch (error) {
    return res.status(500).json(error)

  }
}

const updateCategories = async (req, res) => {
  const { name } = req.body
  const { id } = req.params

  if (!name || !id) {
    return res.status(400).json({ menssagem: 'Envie ID e nome por favor!' })
  }

  try {
    const response = await knex('products_categories')
      .update({ name }).where({ id })

    return res.status(200).json({ menssagem: 'Categoria atualizada com sucesso!' })

  } catch (error) {
    return res.status(500).json(error)

  }
}

const deleteCategories = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ menssagem: 'Envie o novo nome por favor!' })
  }

  try {
    const response = await knex('products_categories').del().where('id', id).returning('*')


    return res.status(200).json({
      menssagem: `Categoria ${response[0].name} deletada com sucesso!`
    })

  } catch (error) {
    return res.status(500).json(error)

  }
}

module.exports = {
  createCategories,
  listCategories,
  updateCategories,
  deleteCategories
}