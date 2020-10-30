const express = require("express");
const multer = require("multer");

const uploadConfigProfilePicture = require('./config/profile_picture')
const uploadConfigRegistrationPath = require('./config/registration_path')
const uploadConfigImages = require('./config/images')


const userController = require('./Controllers/UserController');
const instituitionController = require('./Controllers/InstituitionController');
const classroomController = require("./Controllers/ClassroomController")
const passwordController = require("./Controllers/PasswordController");
const categoryController = require("./Controllers/CagegoryController");
const productController = require("./Controllers/ProductController");

const routes = express.Router();

const uploadPhoto = multer(uploadConfigProfilePicture)
const uploadRegistration = multer(uploadConfigRegistrationPath)
const uploadImages = multer(uploadConfigImages)



//Rotas Dedicadas aos Usuarios
routes.get('/users', userController.show);
routes.get('/user/:id', userController.index);
routes.post('/user/register', uploadPhoto.single("profile_path"), userController.create);
routes.put('/user/update/:id', userController.update);
routes.delete('/user/delete/:id', userController.delete);


//Rotas Dedicadas as Instituições
routes.get('/instituitions', instituitionController.show);
routes.get('/instituitions/:id', instituitionController.index);
routes.post('/instituitions/register', instituitionController.create);
routes.put('/instituitions/update/:id', instituitionController.update);
routes.delete('/instituitions/delete/:id', instituitionController.delete);

//Rotas dedicadas as Controle de Senhas
routes.put('/instituitions/changepassword/:id', passwordController.update_pass_instituition);
routes.put('/user/changepassword/:id', passwordController.update_pass_user);

//Rotas Dedicadas as Salas de aula
routes.get('/classrooms', classroomController.show);
routes.get('/classroom/:id', classroomController.index);
routes.post('/classroom/register', classroomController.create);
routes.put('/classroom/update/:id', classroomController.update);
routes.delete('/classroom/delete/:id', classroomController.delete);

//Rotas Dedicadas as Categorias
routes.get('/categorys', categoryController.show);
routes.get('/category/:id', categoryController.index);
routes.post('/category/register', categoryController.create);
routes.put('/category/update/:id', categoryController.update);
routes.delete('/category/delete/:id', categoryController.delete);

//Rotas Dedicadas aos Produtos
routes.get('/products', productController.show);
routes.get('/product/:id', productController.index);
routes.post('/product/register',uploadImages.array('images') , productController.create);
routes.put('/product/update/:id', productController.update);
//routes.delete('/product/delete/:id', productController.delete);

module.exports = routes;