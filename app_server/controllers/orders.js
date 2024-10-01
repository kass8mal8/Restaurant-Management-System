const Order = require("../models/orders");

const addOrder = async (req, res) => {
	// products in request body is an array
	const { products, totalPrice, telephone } = req.body;
	const { userId } = req.params;

	try {
		const order = await Order.create({
			userId,
			products,
			totalPrice,
			telephone,
		});
		if (order) {
			res.json({ message: "Order placed successfully" }).status(201);
		}
	} catch (error) {
		console.log(error.message);
		res.json({ message: "Unable to place order" }).status(400);
	}
};

// return orders from all users
const getOrder = async (req, res) => {
	// const adminId = req.params;
	try {
		const order = await Order.find();
		order.length > 0
			? res.json(order).status(201)
			: res.json("Not Found").status(404);
	} catch (error) {
		res.json({ message: "Unable to get order" }).status(400);
	}
};

const updateOrder = async (req, res) => {
	const { orderId } = req.params;
	const orderDetails = req.body;

	try {
		const order = await Order.findByIdAndUpdate(orderId, orderDetails, {
			new: true,
		});
		res.status(201).json({ message: "Updated successfully", order });
	} catch (error) {
		res.json({ message: "Unable to update order" }).status(500);
	}
};

module.exports = {
	addOrder,
	getOrder,
	updateOrder,
};
