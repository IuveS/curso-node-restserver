const { response } = require('express');


const usuariosGet = (req= request, res = response) => {
	const { h, nombre = 'no name', apikey, page = 1, limit } = req.query;
	res.json({
		msg: 'get API --desde controlador',
		h,
		nombre,
		apikey,
		page,
		limit
	});
}

const usuariosPut = (req, res = response) => {
	const { id } = req.params;

	res.json({
		msg: 'put API --desde controlador',
		id
	});
}

const usuariosPost = (req, res = response) => {
	//const body = req.body;

	const { nombre, edad, id } = req.body;

	res.json({
		msg: 'put post --desde controlador',
		//body
		nombre,
		edad,
		id
	});
}


const usuariosDelete = (req, res = response) => {

	res.json({
		msg: 'delete post --desde controlador'
	});
}

const usuariosPatch = (req, res = response) => {

	res.json({
		msg: 'patch post --desde controlador'
	});
}


module.exports = {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosPatch,
	usuariosDelete
}