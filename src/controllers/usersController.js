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
                return next(ApiError.badRequest({"errors": [{value: "", msg: "This username already exists", "param":"email","location":"body"}]}));
            }

            const hasEmail = await Users.findOne({where: {email}});
            if (hasEmail) {
                return next(ApiError.badRequest({"errors": [{value: "", msg: "This email already exists", "param":"email","location":"body"}]}));
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const user = await Users.create({username, email, password: hashPassword, role});
            const token = generateJwt(user.id, user.username, user.email, user.role);
            res.cookie("access-token", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json({token});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(errors));
            }
            const {email, password} = req.body;

            const user = await Users.findOne({where: {email}});
            if (!user) {
                return next(ApiError.badRequest({"errors": [{value: "", msg: "A user with such an email does not exist", "param":"email","location":"body"}]}));
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.badRequest({"errors": [{value: "", msg: "Incorrect email or password", "param":"password","location":"body"}]}));
            }

            const token = generateJwt(user.id, user.username, user.email, user.role);
            res.cookie("access-token", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json({token});
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
    }

    async auth (req, res, next) {
        return res.json(req.user);
    }
}

module.exports = new UsersController();