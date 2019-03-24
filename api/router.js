const express = require('express');


const accountController = require('./controller/account.controller');
const todoController = require('./controller/todo.controller');

module.exports = {

    // Routes that are not protected by JWT
    publicRoutes: [
        '/api/login',
        '/api/register'
    ],
    configureRoutes: function (app) {
        const router = express.Router();

        router.post('/login', accountController.login);
        router.post('/register', accountController.register);

        router.get('/todo', todoController.getAll);
        router.post('/todo', todoController.saveTodoList);
        router.put('/todo/:todoId', todoController.saveTodoList);
        router.delete('/todo/:todoId', todoController.deleteTodoList);

        app.use("/api", router);
    }
};