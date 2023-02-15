//Importaciones
const Usuario = require('../models/usuario');
const Role = require('../models/role');

//Validamos en contro de la db si ese correp ya existe
const emailExiste = async(correo = '') => {

    //Verificar si el correo existe en la base de datos
    //Por ser archivo JSON es n llaves {correo}
    const existeEmailDeUsuario = await Usuario.findOne({correo})

    if (existeEmailDeUsuario ) {
        throw new Error(`El correo${ correo }, ya esta registrado en la DB`);
    }     
}

const esRoleValido = async(rol = '') => {   
    //Verificar si el rol es valido y existe en la DB
    const existeRoleDB = await Role.findOne({rol})

    if (!existeRoleDB) {
        throw new Error(`El rol ${rol}, no existe en la DB`)
    }
}

const existeUsuarioPorId = async(id) => {
    //Verificar si existe el ID
    //El Usuario siendo mi modelo desde alli busco ID
    const existIdOfUser = await Usuario.findById(id);

    if (!existIdOfUser) {
        throw new Error(`El id: ${id} no existe en la DB`)
    }

}

module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId
}