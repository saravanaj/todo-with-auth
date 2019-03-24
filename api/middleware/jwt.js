const expressJwt = require('express-jwt');
const config = require('../config.json');
const router = require('../router');
const accountService = require('../service/account.service');

module.exports = jwt();

function jwt() {
    const secret = config.secret;
    return expressJwt({
        secret,
        isRevoked
    }).unless({
        path: router.publicRoutes
    });
}

async function isRevoked(req, payload, done) {
    const user = await accountService.getUserById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    else {
        req.loggedInUserId = user._id;
    }

    done();
};