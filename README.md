# 🌄 Travel Mitra Backend | Hiking & Trekking in Nepal

This is the **backend server** for the Travel Mitra application, built with **Node.js, Express, and MongoDB**.  
It handles **payments, orders, trails, and reviews**, providing APIs consumed by the frontend.

---

## 🌐 Live API

- Example endpoint: `https://github.com/BibasYonghang/travel-mitra-backend/api/trails`  

---

## 🛠 Features

- RESTful API endpoints for:
  - **Orders & Payments** (`/api`)  
  - **Trails** (`/api/trails`)  
  - **Reviews** (`/api/reviews`)  
- **eSewa payment integration**  
- **JWT authentication** for secure endpoints  
- **Multiple MongoDB connections** (Trails DB & Reviews DB)  
- **CORS configured** for frontend domain  
- Centralized **error handling and validation**  
- Production-ready structure  

---

## 🖥 Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Payment Gateway:** eSewa  
- **Authentication:** JWT  
- **Deployment:** Vercel / Railway / Heroku compatible  

---

## ⚡ Installation / Development

Follow these steps to run the backend locally:

```bash
# 1. Clone the repository
git clone https://github.com/BibasYonghang/travel-mitra-backend.git
cd travel-mitra-backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env.development and .env.production files
# Required variables: PORT, MONGODB_URI_TRAILS, MONGODB_URI_REVIEWS, JWT_SECRET, FRONTEND_URL, ESEWA_MERCHANT_ID, ESEWA_SECRET_KEY

# 4. Start development server
npm run dev
Server runs on http://localhost:5000 by default.
```

📝 Project Structure
```bash
├── controllers/          # API controllers (orders, eSewa, trails, reviews)
├── models/               # Mongoose schemas
├── routes/               # Express routes
│   ├── esewa.route.js
│   ├── order.route.js
│   ├── trails.route.js
│   └── reviews.route.js
├── .env.development      # Environment variables for development
├── server.js             # Main server file (Express + DB connection)
├── package.json
└── README.md
```

API Endpoints Overview
```bash
Orders & Payments
Method	Endpoint	Description
POST	/api/payment	Initiate eSewa payment
GET	/api/success	eSewa payment success callback
GET	/api/failure	eSewa payment failure callback
POST	/api/generate-signature	Generate signature for payment

Trails
Method	Endpoint	Description
GET	/api/trails	Get all trails
POST	/api/trails	Add new trail (admin only)
GET	/api/trails/:id	Get trail by ID

Reviews
Method	Endpoint	Description
GET	/api/reviews	Get all reviews
POST	/api/reviews	Add a review
GET	/api/reviews/:id	Get review by ID
```

### `🔧 Configuration & Environment`
CORS: Configured to allow requests only from FRONTEND_URL

MongoDB: Separate connections for Trails DB and Reviews DB

Error Handling: Errors logged to console; can be extended with logging libraries for production

📄 License
```bash
This project is not under any license yet.
```

📞 Contact
```bash
Author: Bibas Yonghang
```

```bash
Email: support@travelmitra.com
```

```bash
Frontend Website: https://travel-mitraa.vercel.app/
```

📝 Notes
```bash
Ensure environment variables are correctly configured before running locally

API is structured to be production-ready and easily deployable to Vercel, Railway, or Heroku

Contributions are not open at this moment
```