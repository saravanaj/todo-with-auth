const accountService = require('../service/account.service');

module.exports = {

    login(req, res, next) {
        accountService.login(req.body)
            .then(token => {
                if (token) {
                    return res.json(token);
                }
            })
            .catch(err => next(err));
    },

    register(req, res, next) {
        accountService.register(req.body)
            .then(token => {
                if (token) {
                    return res.json(token);
                }
            })
            .catch(err => next(err));
    }
};