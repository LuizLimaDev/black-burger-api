const knex = require('../services/conection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signUpAdmin = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      menssagem: 'Informe nome, email e senha do administrador!'
    })
  }

  try {
    const emailVerification = await knex('users_admin')
      .where('email', email)

    if (emailVerification.length > 0) {
      return res.status(400).json({
        menssagem: 'Email já cadastrado como administrador!'
      })
    }

    const passwordEncryptation = await bcrypt.hash(password, 10)

    const response = await knex('users_admin').insert({
      name,
      email,
      password: passwordEncryptation,
    }).returning('*')

    return res.status(201).json(response)

  } catch (error) {
    return res.status(500).json(error)
  }
}

const signInAdmin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(404).json({
      menssagem: 'É necessário informar email e senha para entrar!'
    })
  }

  try {
    const admin = await knex('users_admin')
      .where('email', email).first()

    if (!admin) {
      return res.status(404).json({ menssagem: 'Email ou senha não confere!' })
    }

    const passwordVerification = await bcrypt.compare(password, admin.password)

    if (!passwordVerification) {
      return res.status(404).json({ menssagem: 'Email ou senha não confere!' })
    }

    const { name } = admin

    const token = await jwt.sign({ name }, process.env.JWTPW, { expiresIn: '8h' })

    return res.status(200).json({ name, token })

  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  signInAdmin,
  signUpAdmin
}