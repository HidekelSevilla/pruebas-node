
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, emailExiste, idExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id valido de MongoDb').isMongoId(),
    check('id').custom(idExiste),
    check('rol').custom(rol => esRolValido(rol)),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password tiene que tener mas de 6 letras').isLength({ min: 6 }),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(rol => esRolValido(rol)),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id', 'No es un id valido de MongoDb').isMongoId(),
    check('id').custom(idExiste),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;