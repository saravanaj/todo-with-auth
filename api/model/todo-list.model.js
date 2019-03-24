const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
    listName: {
        type: String,
        required: [true, 'List name is required']
    },
    listItems: [{
        listItemName: {
            type: String,
            required: [true, 'List item name is required']
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

todoListSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('TodoList', todoListSchema);