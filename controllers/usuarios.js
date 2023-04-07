const { response, request } = require('express') //Opcional para que aparezcan opciones
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async(req, res = response) => {

  const {limite = 5, desde = 0} = req.query
  const query = {estado:true}

  // Para ejecutar ambas promesas al mismo tiempo y juntas retornen
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  res.json({
    total,
    usuarios
  })
}

const usuariosPut = async(req, res = response) => {
  //Recuperar parametros enviados por link
  const { id } = req.params 
  const { _id, password, google, correo, ...resto } = req.body

  console.log(id, _id)
  
  //TODO: Validar contra base de datos
  if(password){
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync() //Vueltas para aplicar elgoritmo de encriptacion, defautl: 10
    resto.password = bcryptjs.hashSync(password, salt) //Encriptar
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto)

  res.json(usuario)
}

const usuariosPost = async(req, res = response) => {

  const { nombre, correo, password, role } = req.body
  const usuario = new Usuario({nombre, correo, password, role})

  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync() //Vueltas para aplicar elgoritmo de encriptacion, defautl: 10
  usuario.password = bcryptjs.hashSync(password, salt) //Encriptar

  //Guardar en DB
  await usuario.save()

  res.json({
    msg: 'post API - Controlador',
    usuario
  })
}

const usuariosDelete = async(req, res = response) => {

  const {id} = req.params

  // Borrar de la BD
  const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
  // const usuarioAutenticado = req.usuario
  
  res.json({usuario})
}

module.exports = {
  usuariosGet, usuariosPut, 
  usuariosPost, usuariosDelete
}