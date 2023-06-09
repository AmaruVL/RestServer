const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(role = '') => {
  const existeRol = await Role.findOne({role})
  if(!existeRol){
    throw new Error(`El rol ${role} no está registrado en la BD`)
  }
}

const emailExiste = async(correo = '') => {
  const existeEmail = await Usuario.findOne({correo})
  if(existeEmail){
    throw new Error(`El correo ya está registrado`)
  }
}

const existeUsuarioPorId = async(id) => {
  const existeUsuario = await Usuario.findById(id)
  if(!existeUsuario){
    throw new Error(`El id no existe ${id}`)
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
}