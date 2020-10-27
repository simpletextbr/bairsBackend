const express = require("express");




const userController = require('./Controllers/UserController');
const InstituitionController = require('./Controllers/InstituitionController');

const routes = express.Router();



//User Controller
routes.get('/user', userController.index);


//Instituition Controller
routes.get('/instituitions', InstituitionController.show);
routes.get('/instituitions/:id', InstituitionController.index);
routes.post('/instituitions/register', InstituitionController.create);
routes.put('/instituitions/update/:id', InstituitionController.update);
routes.delete('/instituitions/delete/:id', InstituitionController.delete);










module.exports = routes;