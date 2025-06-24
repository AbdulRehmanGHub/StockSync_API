const Item = require("../models/Item");

exports.createItem = async (name, description, quantity) => {
  const item = new Item({ name, description, quantity });
  return await item.save();
};

exports.updateItem = async (id, updateData) => {
  return await Item.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id);
};
