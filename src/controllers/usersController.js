const {Users} = require("../models/models");
const bcrypt = require("bcrypt");
const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateJwt = (id, username, email, role) => {
    return jwt.sign(
        {id, username, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};

class UsersController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(errors));
            }
            const {username, email, password, role} = req.body;

            const hasUsername = await Users.findOne({where: {username}});
            if (hasUsername) {
                return next(ApiError.badRequest("This username already exists"));
            }

            const hasEmail = await Users.findOne({where: {email}});
            if (hasEmail) {
                return next(ApiError.badRequest("This email already exists"));
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const user = await Users.create({username, email, password: hashPassword, role});
            const token = generateJwt(user.id, user.username, user.email, user.role);
            return res.json({token});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body;

        const user = await Users.findOne({where: {email}});
        if (!user) {
            return next(ApiError.badRequest("A user with such an email does not exist"));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest("Incorrect email or password"));
        }

        const token = generateJwt(user.id, user.username, user.email, user.role);
        return res.json({token});
    }

    async auth (req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.email, req.user.role);
        return res.json({token});
    }
}

module.exports = new UsersController();