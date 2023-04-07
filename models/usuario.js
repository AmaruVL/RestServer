const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'] // 1ero: es requerido, 2do: mensaje si no es enviado
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La constraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})


//Sobreescribir o crear metodos del Schema
UsuarioSchema.methods.toJSON = function() {
  const {__v, _id, password, ...usuario} = this.toObject()
  usuario.uid = _id //Renombrar _id a uid
  return usuario
}

module.exports = model('Usuario', UsuarioSchema)