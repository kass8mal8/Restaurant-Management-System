const Item = require("../models/items");

// Retrieves the list of items for each admin user
const getItems = async (req, res) => {
	const { userId } = req.params;
	try {
		const items = await Item.find({ userId });

		if (items.length > 0) {
			res.status(200).json(items);
		} else {
			res.status(404).json({ message: "No items found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const addItem = async (req, res) => {
	const { userId } = req.params;
	const item = req.body;

	try {
		const newItem = Item.create({ ...item, userId });

		if (newItem.length) {
			res.status(201).json({ message: "Item added successfully" });
		} else {
			res.status(400).json({ message: "Invalid item data" });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateItem = async (req, res) => {
	const { itemId } = req.params;
	const updateDetails = req.body;

	try {
		const updatedItem = await Item.findByIdAndUpdate(itemId, updateDetails, {
			new: true,
		});

		if (updatedItem) {
			res.status(200).json({ message: "Item updated successfully" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteItem = async (req, res) => {
	const { itemId } = req.params;

	try {
		const item = await Item.findByIdAndDelete(itemId);
		if (item) {
			res.status(200).json({ message: "Item deleted successfully" });
		} else {
			res.status(404).json({ message: "Item not found" });
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports = {
	getItems,
	addItem,
	updateItem,
	deleteItem,
};
