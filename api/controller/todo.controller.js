const todoService = require('../service/todo.service');


module.exports = {

    getAll(req, res, next) {
        return todoService.getAll(req.loggedInUserId)
            .then(todos => res.json(todos))
            .catch(err => next(err));
    },

    saveTodoList(req, res, next) {
        const todoListObj = req.body;
        todoListObj.createdBy = req.loggedInUserId;

        return todoService.saveTodoList(req.params.todoId, todoListObj)
            .then(todo => res.json(todo))
            .catch(err => next(err));
    },

    deleteTodoList(req, res, next) {
        return todoService.deleteTodoList(req.params.todoId)
            .then(response => res.json(response))
            .catch(err => next(err));
    },

};