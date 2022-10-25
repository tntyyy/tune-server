const Router = require("express");
const router = new Router();
const usersRouter = require("./usersRouter");
const tracksRouter = require("./tracksRouter");
const releasesRouter = require("./releasesRouter");
const favoritesRouter = require("./favoritesRouter");

router.use("/users", usersRouter);
router.use("/tracks", tracksRouter);
router.use("/releases", releasesRouter);
router.use("/favorites", favoritesRouter);

module.exports = router;