const { createItem } = require("../../controllers/itemController");

jest.mock("../../models/Item", () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        _id: "mock-id",
        name: "Mock Item",
        quantity: 10,
      }),
    };
  });
});

describe("Item Controller", () => {
  it("should create a new item", async () => {
    const newItem = await createItem("Test Item", "Description", 5);
    expect(newItem.name).toBe("Mock Item");
    expect(newItem.quantity).toBe(10);
  });
});
