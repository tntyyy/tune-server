const Router = require("express");
const router = new Router();
const releasesController = require("../controllers/releasesController");
const CheckRole = require("../middlewares/CheckRoleMiddleware");

router.post("/", CheckRole("ARTIST"), releasesController.createRelease);
router.get("/", releasesController.getAllReleases);
router.get("/:id", releasesController.getOneRelease);
router.delete("/:id", CheckRole("ARTIST"), releasesController.deleteRelease);

module.exports = router;