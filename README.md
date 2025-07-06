
---

## 📁 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint                  | Description         |
|--------|---------------------------|---------------------|
| POST   | `/auth/register`         | Register a new user |
| POST   | `/auth/login`            | User login          |
| POST   | `/auth/otp`              | OTP verification    |

---

### 📦 Product Routes

> All endpoints prefixed with `/api/product`

| Method | Endpoint                 | Description            |
|--------|--------------------------|------------------------|
| GET    | `/api/product`          | Get all products       |
| POST   | `/api/product`          | Create a new product   |
| GET    | `/api/product/:id`      | Get a product by ID    |
| DELETE | `/api/product`          | Delete all products    |
| DELETE | `/api/product/:id`      | Delete product by ID   |
| PUT    | `/api/product/:id`      | Update product by ID   |

---

### 🛒 Cart Routes

> All endpoints prefixed with `/api`

| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | `/api/add-to-cart`          | Add item to cart     |
| DELETE | `/api/remove-from-cart`     | Remove item from cart|
| PATCH  | `/api/update-cart`          | Update cart quantity |
| GET    | `/api/get-cart`             | Get user's cart      |

---

## ⚙️ How to Use

### 📦 Clone and Install

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
