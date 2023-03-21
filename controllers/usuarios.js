const { response, request } = require('express') //Opcional para que aparezcan opciones

const usuariosGet = (req, res = response) => {

  const { q, nombre = 'no name', apikey } = req.query

  res.json({
    msg: 'get API - Controlador',
    nombre,apikey
  })
}

const usuariosPut = (req, res = response) => {

  //REcuperar parametros enviados por link
  const { id } = req.params 

  res.json({
    msg: 'put API - Controlador',
    id
  })
}

const usuariosPost = (req, res = response) => {
  const {nombre, edad} = req.body

  res.json({
    msg: 'post API - Controlador',
    nombre, edad
  })
}

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - Controlador'
  })
}

module.exports = {
  usuariosGet, usuariosPut, 
  usuariosPost, usuariosDelete
}