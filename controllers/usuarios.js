const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');



const usuariosGet = async (req= request, res = response) => {
//	const { h, nombre = 'no name', apikey, page = 1, limit } = req.query;
	const { limite = 2, desde = 0 } = req.query;
	const query = { estado: true };


	// aqui hasta....===>
	//const usuarios = await Usuario.find(query)
		//.skip(Number(desde))
		//.limit(Number(limite));

	//const total = await Usuario.countDocuments(query);
	// ===> aqui

	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query)
			.skip(Number(desde))
			.limit(Number(limite))
	]);


	res.json({
		total,
		usuarios
	//	msg: 'get API --desde controlador',
	//	h,
	//	nombre,
	//	apikey,
	//	page,
	//	limit
	});
}

const usuariosPut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, correo, ...resto } = req.body;

	// TODO validar con base de datos
	if (password) {

			// Encriptar la contraseña
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);

    }
	const usuario = await Usuario.findByIdAndUpdate(id, resto);



	res.json(usuario);
}

const usuariosPost = async (req, res = response) => {



	//const body = req.body;
	const { nombre, correo, password, rol } = req.body;
//	const { google, ...resto } = req.body; con mil campos
//	const usuario = new Usuario(resto);
	const usuario = new Usuario({ nombre, correo, password, rol });



	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);




	// Guardar en DB




	await usuario.save();
	//const { nombre, edad, id } = req.body;

	res.json({
		msg: 'put post --desde controlador',
		//body
		usuario

		//nombre,
		//edad,
		//id
	});
}


const usuariosDelete = async (req, res = response) => {
	const { id } = req.params;

	//Borrar fisicamente, no recomendado
	//const usuario = await Usuario.findByIdAndDelete(id);

	// Borrar cambiando el estado pero no lo borra fisicamente
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


	res.json(usuario);
}

const usuariosPatch = (req, res = response) => {

	res.json({
		id
	});
}


module.exports = {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosPatch,
	usuariosDelete
}