const request = require("supertest");
const app = require("../../server");
const Item = require("../../models/Item");

const testApp = request(app);

describe("API Endpoints", () => {
  let testItem;

  beforeEach(async () => {
    testItem = new Item({ name: "API Test", quantity: 5 });
    await testItem.save();
  });

  afterEach(async () => {
    await Item.deleteMany();
  });

  it("GET /api/items - should get all items", async () => {
    const res = await testApp.get("/api/items");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("API Test");
  });

  it("POST /api/items - should create a new item", async () => {
    const res = await testApp
      .post("/api/items")
      .send({ name: "New Item", quantity: 10 });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe("New Item");

    const items = await Item.find();
    expect(items).toHaveLength(2);
  });

  it("PATCH /api/items/:id - should update an item", async () => {
    const res = await testApp
      .patch(`/api/items/${testItem._id}`)
      .send({ quantity: 8 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.quantity).toBe(8);

    const updated = await Item.findById(testItem._id);
    expect(updated.quantity).toBe(8);
  });

  it("DELETE /api/items/:id - should delete an item", async () => {
    const res = await testApp.delete(`/api/items/${testItem._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Item deleted successfully");

    const items = await Item.find();
    expect(items).toHaveLength(0);
  });
});
