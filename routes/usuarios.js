const {Router} = require('express')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
  check('id','No es un ID válido').isMongoId(), //id obtiene del segmento, no del parametro de la Schema
  check('id').custom( existeUsuarioPorId ),
  check('role').custom( esRoleValido ),
  validarCampos,
],usuariosPut)

router.post('/', [
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser más de 6 letras').isLength({min:6}),
  check('correo','El correo no es válido').isEmail(), //Middleware para validar (crea errores)
  check('correo').custom( emailExiste ),
  check('role').custom( esRoleValido ),
  // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validarCampos
], usuariosPost)

router.delete('/:id',[
  check('id','No es un ID válido').isMongoId(), //id obtiene del segmento, no del parametro de la Schema
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], usuariosDelete)

module.exports = router