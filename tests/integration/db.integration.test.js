const Item = require("../../models/Item");

describe("Database Integration", () => {
  it("should create and find an item", async () => {
    const newItem = new Item({
      name: "Integration Test",
      quantity: 10,
    });
    const savedItem = await newItem.save();

    const foundItem = await Item.findById(savedItem._id);

    expect(foundItem.name).toBe("Integration Test");
    expect(foundItem.quantity).toBe(10);
  });

  it("should update an item", async () => {
    const item = new Item({ name: "Test", quantity: 5 });
    await item.save();

    const updated = await Item.findByIdAndUpdate(
      item._id,
      { quantity: 10 },
      { new: true }
    );

    expect(updated.quantity).toBe(10);
  });

  it("should delete an item", async () => {
    const item = new Item({ name: "To Delete", quantity: 1 });
    await item.save();

    await Item.findByIdAndDelete(item._id);
    const deleted = await Item.findById(item._id);

    expect(deleted).toBeNull();
  });
});
