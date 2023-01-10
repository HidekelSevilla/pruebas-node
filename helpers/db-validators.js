const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '')  =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }

}

const emailExiste = async(correo='') =>{
    const emailDuplicado = await Usuario.findOne( {correo} );
    if (emailDuplicado) {
        throw new Error(`El email ${correo} ya esta registrado en la base de datos`)
    }

}
const idExiste = async( id ) =>{
    const idDuplicado = await Usuario.findById( id );
    if (!idDuplicado) {
        throw new Error(`El id ${id} no esta registrado en la base de datos`)
    }

}
module.exports={
    esRolValido,
    emailExiste,
    idExiste
}