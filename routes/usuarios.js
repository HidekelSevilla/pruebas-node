
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');


const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password tiene que tener mas de 6 letras').isLength({ min: 6 }),
      // check('rol', 'El rol no es valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(async(rol = '')  =>{
        const existeRol = await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
        }

    }),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;