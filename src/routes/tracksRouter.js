const Router = require("express");
const router = new Router();
const tracksController = require("../controllers/tracksController");

router.post("/", tracksController.createTrack);
router.get("/", tracksController.getAllTracks);
router.get("/:id", tracksController.getOneTrack);
router.delete("/:id", tracksController.deleteTrack);

module.exports = router;