const ApiError = require("../error/apiError");

class UsersController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async auth (req, res, next) {
        const {id} = req.query;
        if (!id) {
            next(ApiError.badRequest("Where ID?"))
        }
        res.json(id);
    }
}

module.exports = new UsersController();