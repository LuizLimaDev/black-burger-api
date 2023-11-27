const knex = require('../services/conection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUpUser = async (req, res) => {
  const { name, email, phone, password } = req.body

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ menssagem: 'Todos os dados são necessários para cadastro.' })
  }

  try {
    const response = await knex('users')

    const emailVerification = response.find(user => user.email === email)

    if (emailVerification) {
      return res.status(400).json({ menssagem: 'Email já existente!' })
    }

    const passwordCryptograpy = await bcrypt.hash(password, 10)

    const signUp = await knex('users')
      .insert({ name, email, phone, password: passwordCryptograpy })

    return res.status(200).json({ menssagem: `Usuário ${name} cadastrado com sucesso!` })

  } catch (error) {
    return res.status(500).json(error)
  }
}

const signInUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(404).json({ menssagem: 'Email ou senha não confere!' })
  }

  try {
    const user = await knex('users').where('email', email).first()

    if (!user) {
      return res.status(404).json({ menssagem: 'Email ou senha não confere!' })
    }

    const passwordVerification = await bcrypt.compare(password, user.password)

    if (!passwordVerification) {
      return res.status(404).json({ menssagem: 'Email ou senha não confere!' })
    }

    const { id, name, phone } = user
    const userLoged = {
      id,
      name,
      email,
      phone,
    }

    const token = jwt.sign({ id, name, email, phone }, process.env.JWTPW, { expiresIn: '8h' })

    return res.status(200).json({ userLoged, token })

  } catch (error) {
    return res.status(500).json(error)
  }

}

const signUpUserThirdService = async (req, res) => {
  const { name, email, image } = req.body

  if (!name || !email || !image ) {
    return res.status(400).json({ menssagem: 'Todos os dados são necessários para cadastro.' })
  }

  try {
    const response = await knex('users_thirdservice')

    const emailVerification = response.find(user => user.email === email)

    if (emailVerification) {
      return res.status(400).json({ menssagem: 'Email já existente!' })
    }

    const signUp = await knex('users_thirdservice')
      .insert({ name, email, image })

    return res.status(200).json({ menssagem: `Usuário ${name} cadastrado com sucesso!` })

  } catch (error) {
    return res.status(500).json(error)
  }
}

const signInUserThirdService = async (req, res) => {
  const { name, email } = req.body

  if (!name || !email ) {
    return res.status(404).json({ menssagem: 'Email ou senha não confere!' })
  }

  try {
    const user = await knex('users_thirdservice').where('email', email).first()

    if (!user) {
      return res.status(404).json({ menssagem: 'Email ou senha não confere!' })
    }

    const { id, name, email } = user
    const userLoged = {
      id,
      name,
      email,
    }

    const token = jwt.sign({ id, name, email, phone }, process.env.JWTPW, { expiresIn: '8h' })

    return res.status(200).json({ userLoged, token })

  } catch (error) {
    return res.status(500).json(error)
  }

}

module.exports = {
  signUpUser,
  signInUser,
  signUpUserThirdService,
  signInUserThirdService
}