import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to MongoDB

// Middlewares
app.use(express.json());
app.use(cors({ allowedHosts: "localhost:5000" }));
app.use(morgan("dev"));

// Routes

//start server 
app.listen(PORT, () => {
    console.log(`Server in running on ${PORT}`)
});