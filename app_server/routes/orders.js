const { Router } = require("express");
const { addOrder, getOrder, updateOrder } = require("../controllers/orders");
const router = Router();

router.post("/create/:userId", addOrder);
router.get("/", getOrder);
router.put("/update/:orderId", updateOrder);

module.exports = router;
