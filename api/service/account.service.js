const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/db');

module.exports = {

    async getUserById(userId) {
        return await db.User.findById(userId).select('-passwordhash');
    },

    async login(userParamObj) {

        const user = await db.User.findOne({
            username: userParamObj.username
        });
        
        if (user && bcrypt.compareSync(userParamObj.password, user.passwordhash)) {
            return createToken(user);
        } else {
            throw `Invalid username of password`;
        }
    },

    async register(userParamObj) {

        // validate
        if (await db.User.findOne({
                username: userParamObj.username
            })) {
            throw `Username ${userParamObj.username} is already taken`;
        }

        const user = new db.User(userParamObj);

        // hash password
        if (userParamObj.password) {
            user.passwordhash = bcrypt.hashSync(userParamObj.password, 10);
        }

        const err = user.validateSync();
        if (!err) {                

            // save user
            await user.save();

            // Create a token
            return createToken(user);
        } else {
            throw err;
        }
    }
};


function createToken(user) {
    const {
        passwordhash,
        ...userWithoutHash
    } = user.toObject();

    const token = jwt.sign({
        sub: user.id
    }, config.secret, {
        expiresIn: config.tokenExpirationTime || '24h'
    });

    return {
        ...userWithoutHash,
        token
    };
}
