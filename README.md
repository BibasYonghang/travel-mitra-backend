# Travel Mitra Backend | Hiking & Trekking in Nepal
This is the **backend server** for the Travel Mitra application, built with **Node.js, Express, and MongoDB**.  
It handles **payments, orders, trails, and reviews**, providing APIs consumed by the frontend.

---

## 🌐 Live API

- Example: `https://github.com/BibasYonghang/travel-mitra-backend/api/trails`

---

## 🛠 Features

- RESTful API endpoints for:
  - **Orders & Payments** (`/api`)  
  - **Trails** (`/api/trails`)  
  - **Reviews** (`/api/reviews`)  
- eSewa payment integration
- JWT authentication
- Multiple MongoDB connections (Trails DB & Reviews DB)
- CORS configured for frontend domain
- Error handling and validation ready
- Ready for production deployment

---

## 🖥 Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Payment Gateway:** eSewa  
- **Authentication:** JWT 
- **Deployment:** Vercel / Railway / Heroku compatible  


## ⚡ Installation / Development

1. **Clone the repository**


git clone https://github.com/BibasYonghang/travel-mitra-backend
cd travel-mitra-backend
Install dependencies
npm install
Set up environment variables
npm run dev
Server will run on http://localhost:5000.

📝 Project Structure
text
Copy code
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
🚀 API Endpoints Overview
Orders & Payment
Method	Endpoint	Description
POST	/api/payment	Initiate eSewa payment
GET	/api/success	eSewa payment success callback
GET	/api/failure	eSewa payment failure callback
POST	/api/generate-signature	Generate signature for payment

Trails
Method	Endpoint	Description
GET	/api/trails	Get all trails
POST	/api/trails	Add new trail (admin)
GET	/api/trails/:id	Get trail by ID

Reviews
Method	Endpoint	Description
GET	/api/reviews	Get all reviews
POST	/api/reviews	Add a review
GET	/api/reviews/:id	Get review by ID

🔧 Configuration & Environment
CORS: Configured to allow requests only from FRONTEND_URL

MongoDB: Separate connections for Trails DB and Reviews DB

Error Handling: Errors logged to console; ready to extend with logging libraries for production

📄 License
This project is not under any license yet.

📞 Contact
Author: Bibas Yonghang

Email: support@travelmitra.com

Frontend Website: https://travel-mitraa.vercel.app/

