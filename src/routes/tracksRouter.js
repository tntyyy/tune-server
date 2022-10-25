const Router = require("express");
const router = new Router();
const tracksController = require("../controllers/tracksController");
const CheckRole = require("../middlewares/CheckRoleMiddleware");

router.post("/", CheckRole("ARTIST"), tracksController.createTrack);
router.get("/", tracksController.getAllTracks);
router.get("/:id", tracksController.getOneTrack);
router.delete("/:id", CheckRole("ARTIST"), tracksController.deleteTrack);

module.exports = router;