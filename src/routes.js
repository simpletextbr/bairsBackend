const express = require("express");
const multer = require("multer");

const uploadConfigProfilePicture = require('./config/profile_picture')
const uploadConfigRegistrationPath = require('./config/registration_path')
const uploadConfigImages = require('./config/images')


const userController = require('./Controllers/UserController');
const instituitionController = require('./Controllers/InstituitionController');
const classroomController = require("./Controllers/ClassroomController")

const routes = express.Router();

const uploadPhoto = multer(uploadConfigProfilePicture)
const uploadRegistration = multer(uploadConfigRegistrationPath)
const uploadImages = multer(uploadConfigImages)



//Rotas Dedicadas aos Usuarios
routes.get('/user', userController.show);
routes.get('/user/:id', userController.index);
routes.post('/user/register', uploadPhoto.single("profile_path"), userController.create);
//routes.put('/user/update/:id', userController.update);
//routes.delete('/user/delete/:id', userController.delete);


//Rotas Dedicadas as Instituições
routes.get('/instituitions', instituitionController.show);
routes.get('/instituitions/:id', instituitionController.index);
routes.post('/instituitions/register', instituitionController.create);
routes.put('/instituitions/update/:id', instituitionController.update);
routes.delete('/instituitions/delete/:id', instituitionController.delete);

//Rotas Dedicadas as Salas de aula
routes.get('/classroom', classroomController.show);
routes.get('/classroom/:id', classroomController.index);
routes.post('/classroom/register', classroomController.create);
routes.put('/classroom/update/:id', classroomController.update);
routes.delete('/classroom/delete/:id', classroomController.delete);












module.exports = routes;