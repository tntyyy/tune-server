const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
       const token = req.headers.cookie.substr(13);

        if (!token) {
            return res.status(401).json({message: "The user is not logged in"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded
        next();
    } catch (e) {
        res.status(401).json({message: "Something went wrong..."});
    }
}