const { Schema, model } = require("mongoose");

const options = {
	type: Number,
	required: true,
};

const itemSchema = new Schema({
	title: String,
	price: options,
	quantity: options,
	category: {
		type: String,
		enum: ["breakfast", "lunch", "supper"],
		default: "breakfast",
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	inStock: {
		type: Schema.Types.String,
		enum: ["true", "false"],
		default: "true",
	},
});

const Item = model("Item", itemSchema);
module.exports = Item;
