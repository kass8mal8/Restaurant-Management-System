// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const options = {
	type: Number,
	required: true,
};

const objectOptions = {
	type: Schema.Types.ObjectId,
	required: true,
};

const orderSchema = new Schema({
	userId: {
		...objectOptions,
		ref: "User",
	},
	telephone: {
		type: String,
		required: true,
		match: /^0\d{9}$/, // Regex to validate phone numbers in the format 0712345678
	},
	userId: {
		...objectOptions,
		ref: "User",
	},
	products: [
		{
			productName: {
				type: String,
				required: true,
			},
			productPrice: options,
			productQuantity: options,
		},
	],
	totalPrice: options,
	orderDate: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
		default: "Pending",
	},
});

const Order = model("Order", orderSchema);

module.exports = Order;
