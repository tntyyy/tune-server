const Router = require("express");
const router = new Router();

router.post("/");
router.get("/");
router.get("/:id");
router.delete("/:id");

module.exports = router;