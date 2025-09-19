// IMPOERT FROM LIBRARY
import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";
import dotenv from "dotenv";



// IMPORTS FROM OWN BACKEND
// import khaltiRoutes from "./routes/khalti.js";
// import esewaRoutes from "./routes/esewa.js";
import trailRoutes from "./routes/trails.js";


dotenv.config();
const app = express();



// MIDDLEWARE
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json())


// app.use("/api/khalti", khaltiRoutes);
// app.use("/api/esewa", esewaRoutes);
app.use("/api/trails", trailRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
