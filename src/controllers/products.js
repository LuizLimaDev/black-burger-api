const knex = require('../services/conection')

const addProduct = async (req, res) => {
    const { img, name, description, price, category_id } = req.body

    if (!img || !name || !description || !price) {
        return res.status(400).json({
            menssagem: 'Todos os campos são necessários para o cadastro!'
        })
    }

    try {
        const response = await knex('products').insert({
            img,
            name,
            description,
            price,
            category_id
        }).returning('*')

        return res.status(201).json(response)

    } catch (error) {
        return res.status(400).json(error.detail)
    }
};

const listProducts = async (req, res) => {
    try {
        const response = await knex('products')

        if (response.length === 0) {
            return res.status(200).json({ menssagem: 'Nenhum produto cadastrado!' })
        }

        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json(error.detail)
    }
};

const updateProducts = async (req, res) => {
    const { img, name, description, price, category } = req.body
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            menssagem: 'É necessário informar o ID do produto.'
        })
    }

    if (!img && !name && !description && !price && !category) {
        return res.status(400).json({
            menssagem: 'Nenhum dado foi enviado para alteração'
        })
    }

    try {
        const response = await knex('products')
            .update({ img, name, description, price, category })
            .where({ id }).returning('*')

        return res.status(200).json(response)

    } catch (error) {
        console.log(error.details)
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ menssagem: 'É necessário informar um ID.' })
    }

    try {
        const response = await knex('products').del().where('id', id).returning('*')

        return res.status(200).json({ menssagem: `Produto ${response[0].name} deletado com sucesso!` })

    } catch (error) {
        return res.status(400).json(error.detail)
    }
};

module.exports = {
    addProduct,
    listProducts,
    updateProducts,
    deleteProduct
}
