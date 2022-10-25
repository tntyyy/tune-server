const Router = require("express");
const router = new Router();
const favoritesController = require("../controllers/favoritesController");

router.post("/", favoritesController.createFavorite);
router.get("/", favoritesController.getAllFavorites);
router.get("/:id", favoritesController.getOneFavorite);
router.delete("/:id", favoritesController.deleteFavorite);

module.exports = router;