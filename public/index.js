const itemForm = document.getElementById("itemForm");
const itemsList = document.getElementById("itemsList");

const API_URL = "/api/items";

document.addEventListener("DOMContentLoaded", loadItems);

itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await addItem();
  itemForm.reset();
});

// Add
async function addItem() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!name || isNaN(quantity)) {
    alert("Please fill in all required fields correctly.");
    return;
  }

  const item = { name, description, quantity };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to add item");
    }

    loadItems();
  } catch (error) {
    console.error("Error adding item:", error);
    alert("Error adding item. Please try again.");
  }
}

// Load
async function loadItems() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const items = await response.json();
    renderItems(items);
  } catch (error) {
    console.error("Error loading items:", error);
    renderError();
  }
}

// Render
function renderItems(items) {
  if (!items || items.length === 0) {
    itemsList.innerHTML = `
          <div class="empty-state">
            <h3>No Items in Inventory</h3>
            <p>Add your first item to get started</p>
          </div>
        `;
    return;
  }

  itemsList.innerHTML = items
    .map(
      (item) => `
        <div class="item-card" data-id="${item._id}">
          <div class="item-header">
            <h3 class="item-name">${item.name}</h3>
            <div class="item-quantity">${item.quantity} in stock</div>
          </div>
          <p class="item-description">${
            item.description || "No description available"
          }</p>
          <div class="item-actions">
            <input type="number" class="qty-input" value="${
              item.quantity
            }" min="0">
            <button class="btn-primary" onclick="updateItem('${
              item._id
            }')">Update</button>
            <button class="btn-danger" onclick="deleteItem('${
              item._id
            }')">Delete</button>
          </div>
        </div>
      `
    )
    .join("");
}

// Delete
window.deleteItem = async (id) => {
  if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete item");
    }

    loadItems();
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Error deleting item. Please try again.");
  }
};

// Update
window.updateItem = async (id) => {
  const itemElement = document.querySelector(`.item-card[data-id="${id}"]`);
  const qtyInput = itemElement.querySelector(".qty-input");
  const newQty = parseInt(qtyInput.value);

  if (isNaN(newQty) || newQty < 0) {
    alert("Please enter a valid quantity");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQty }),
    });

    if (!response.ok) {
      throw new Error("Failed to update item");
    }

    loadItems();
  } catch (error) {
    console.error("Error updating item:", error);
    alert("Error updating item. Please try again.");
  }
};

function renderError() {
  itemsList.innerHTML = `
        <div class="empty-state">
          <h3>Error Loading Inventory</h3>
          <p>Failed to load inventory data</p>
          <button class="btn-primary" style="margin-top: 15px;" onclick="loadItems()">Try Again</button>
        </div>
      `;
}
