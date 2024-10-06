const { Router } = require("express");
const {
	addItem,
	getItems,
	updateItem,
	deleteItem,
} = require("../controllers/items");
const router = Router();

router.get("/:userId", getItems);
router.post("/create/:userId", addItem);
router.put("/update/:itemId", updateItem);
router.delete("/delete/:itemId", deleteItem);

module.exports = router;
