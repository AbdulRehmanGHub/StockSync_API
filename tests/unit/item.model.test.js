const Item = require("../../models/Item");

describe("Item Model", () => {
  it("should require name field", async () => {
    const item = new Item({ quantity: 5 });
    await expect(item.save()).rejects.toThrow("Item validation failed");
  });

  it("should default quantity to 1", async () => {
    const item = new Item({ name: "Test Item" });
    await item.save();
    expect(item.quantity).toBe(1);
  });

  it("should trim name field", async () => {
    const item = new Item({ name: "  Test Item  " });
    await item.save();
    expect(item.name).toBe("Test Item");
  });
});
