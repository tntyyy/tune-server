const Router = require("express");
const router = new Router();
const releasesController = require("../controllers/releasesController");

router.post("/", releasesController.createRelease);
router.get("/", releasesController.getAllReleases);
router.get("/:id", releasesController.getOneRelease);
router.delete("/:id", releasesController.deleteRelease);

module.exports = router;