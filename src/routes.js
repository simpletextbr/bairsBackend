const express = require("express");
const multer = require("multer");

const uploadConfigProfilePicture = require('./config/profile_picture')
const uploadConfigRegistrationPath = require('./config/registration_path')
const uploadConfigImages = require('./config/images')


const userController = require('./Controllers/UserController');
const sessionController = require('./Controllers/SessionController');
const instituitionController = require('./Controllers/InstituitionController');
const classroomController = require("./Controllers/ClassroomController")
const passwordController = require("./Controllers/PasswordController");
const categoryController = require("./Controllers/CagegoryController");
const productController = require("./Controllers/ProductController");
const imagesController = require("./Controllers/ImagesController");
const registrationController = require("./Controllers/RegistrationController");


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

//Rota Dedicada ao Ctontrole De Seção
routes.post('/session/instituition', sessionController.create_instituition);
routes.post('/session/user', sessionController.create_user);

//Rotas Dedicadas as Instituições
routes.get('/instituitions', instituitionController.show);
routes.get('/instituitions/:id', instituitionController.index);
routes.post('/instituitions/register', instituitionController.create);
routes.put('/instituitions/update/:id', instituitionController.update);
routes.delete('/instituitions/delete/:id', instituitionController.delete);

//Rotas dedicadas as Controle de Senhas
routes.put('/instituition/changepassword/:id', passwordController.update_pass_instituition);
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
routes.post('/product/register', uploadImages.array('images'), productController.create);
routes.put('/product/update/:id', uploadImages.array('images'), productController.update);
routes.delete('/product/delete/:id', productController.delete);

//Rota Dedicadas as Images
routes.get('/images', imagesController.show);

//Rotas Dedicadas as Matriculas
routes.put('/registration/send', uploadRegistration.single("registration_path"), registrationController.create);
routes.put('/registration/update/:id', registrationController.update);




module.exports = routes;