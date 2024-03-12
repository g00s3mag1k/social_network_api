const { Schema, model, } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Enter a valid E-mail address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

userSchema.virtual('//*enter name of function*//').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;