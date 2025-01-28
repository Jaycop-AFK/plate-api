import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/database";
import userRoute from "./routes/user.route";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("api is ready!!!");
  });

// Middleware to parse JSON payloads
app.use(express.json());

app.post('/', (req, res) => {
  
    console.log(req.body); // Log the received JSON data
    res.send('Data received successfully!');
});

  app.use("/users", userRoute);

  app.listen(process.env.PORT!, async () => {
    await sequelize.sync();
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
  

  