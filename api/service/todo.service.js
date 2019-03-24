const db = require('../db/db');

module.exports = {

    async getAll(userId) {
        return await db.TodoList.find({
            createdBy: userId
        });
    },

    async saveTodoList(todoId, todoListObj) {
        const id = todoListObj._id || todoId;
        if (id) {
            delete todoListObj._id;
            return await db.TodoList.findOneAndUpdate(id, todoListObj, {
                new: true
            });
        }
        else {
            return await db.TodoList.create(todoListObj);
        }
    },

    async deleteTodoList(todoListId) {
        return await db.TodoList.findByIdAndDelete(todoListId);
    },

};